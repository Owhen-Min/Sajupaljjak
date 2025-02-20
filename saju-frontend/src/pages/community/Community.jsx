import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TopBar3 from "../../components/TopBar3";
import BottomNav from "../../components/BottomNav";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";
import ArticleList from "../../components/ArticleList";
import { HiSearch } from "react-icons/hi";
import { GoPencil } from "react-icons/go";
import CommunityFilter from "../../components/CommunityFilter";
import { IoArrowBack } from "react-icons/io5";
import  useInfiniteGet  from "../../hooks/useInfiniteGet";

function Community() {
  const [searchQuery, setSearchQuery] = useState("");
  // 필터 상태: 초기에는 "전체"만 선택 (하위는 빈문자열)
  const [selectedTop, setSelectedTop] = useState("전체");
  const [selectedSub, setSelectedSub] = useState("");
  const navigate = useNavigate();
  // const data = articles; // 임시 데이터
  const [articles, setArticles] = useState(
    [
    //   {
    //   createdAt: "",
    //   boardId: 0,
    //   mainType: "",
    //   subType: "",
    //   celestialStem: "",
    //   title: "",
    //   content:"",
    //   likeCount: 0,
    //   commentCount: 0,
    // },
  ]
);

  const observerRef = useRef(null);
  const { data, fetchNextPage, hasNextPage } = useInfiniteGet("/api/community", {
    initialCursor: 0,
  });

  useEffect(() => {
    if (data) {
      setArticles((prev) => [
        ...prev,
        ...data.pages.flatMap((page) => page?.content || []),
      ]);

    }
  }, [data]);

  // 필터링: 하위 메뉴가 선택되었을 때만 필터 적용; 그렇지 않으면 전체 표시
  const filteredArticles = articles.filter((article) => {
    let pass = true;
    if (selectedTop !== "전체" && selectedSub) {
      pass = pass && article.subType === selectedSub;
    }
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      pass =
        pass &&
        (article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query));
    }
    return pass;
  });

  const sentinelRef = useCallback(
      (node) => {
        if (observerRef.current) observerRef.current.disconnect();
        observerRef.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        });
        if (node) observerRef.current.observe(node);
      }, [fetchNextPage, hasNextPage]
    );

  return (
    <div className="relative h-screen flex flex-col bg-gray-50 font-NanumR">
      <Header />
      <div className="flex-grow overflow-y-auto">
        {/* 필터 메뉴 */}
        <CommunityFilter
          selectedTop={selectedTop}
          selectedSub={selectedSub}
          setSelectedTop={setSelectedTop}
          setSelectedSub={setSelectedSub}
        />

        {/* 검색 바 */}
        <div className="flex items-center border-2 border-gray-200 mx-2 rounded-md shadow-sm">
          <Input
            type="text"
            placeholder="게시글 검색하기"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-3 py-2 border-none text-gray-800 focus:outline-none"
          />
          <MainButton
            onClick={() => console.log(searchQuery)}
            className="p-2 text-2xl text-gray-600 font-extrabold bg-white rounded-r-md"
          >
            <HiSearch />
          </MainButton>
        </div>

        {/* 게시글 목록 */}
        <ArticleList articles={filteredArticles} />
        <div ref={sentinelRef} className="h-4"></div>
      </div>

      {/* 글쓰기 버튼 (FAB) */}
      <button
        onClick={() => navigate("/community/write")}
        className=" hover:opacity-90 absolute bottom-20 right-4 w-14 h-14 bg-gray-400/80 text-white text-2xl flex items-center justify-center font-extrabold shadow-md rounded-full"
      >
        <GoPencil />
      </button>
      <BottomNav />
    </div>
  );
}

function Header() {
  return (
    <header className="h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">게시판</h1>
    </header>
  );
}

export default Community;
