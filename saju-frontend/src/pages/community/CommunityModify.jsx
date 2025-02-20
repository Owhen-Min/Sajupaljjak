
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TopBar2 from "../../components/TopBar2";
import Input from "../../components/Input";
import MainButton from "../../components/MainButton";

import { useGet, usePut } from "../../hooks/useApi";
import SajuUserBubble from "../../components/SajuUserBubble";
import { IoArrowBack } from "react-icons/io5";
import { sub } from "@tensorflow/tfjs";
import { useEffect } from "react";

// ErrorBubble 컴포넌트
function ErrorBubble({ children }) {
  return (
    <div className="mt-2 text-sm text-red-500 bg-red-50 px-3 py-2 rounded">
      {children}
    </div>
  );
}

// 천간 선택 드롭다운 컴포넌트
function CelestialStemDropdown({ selectedStem, setSelectedStem }) {
  const options = [
    "갑목",
    "을목",
    "병화",
    "정화",
    "무토",
    "기토",
    "경금",
    "신금",
    "임수",
    "계수",
  ];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (option) => {
    setSelectedStem(option);
    setDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none"
      >
        <span>{selectedStem || "게시판 천간 선택"}</span>
        <svg
          className="w-4 h-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {dropdownOpen && (
        <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option}
              className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
              onClick={() => handleSelect(option)}
            >
              <SajuUserBubble skyElement={option} size="small" />
              <span>{option}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CommunityModify() {
  const navigate = useNavigate();
  const [selectedStem, setSelectedStem] = useState("");
  const mutation = usePut();
  const postId = useParams().postId;
  // const {data, isPending, error} = useGet(`community/${postId}`)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    celestialStem: JSON.parse(localStorage.getItem("user")).celestial_stem_id,
    subType: "",
    mainType: "",
  });

  // useEffect(() => {
  //   if (data) {
  //     setFormData(
  //       {
  //         title: data.title,
  //         content: data.content,
  //         celestialStem: data.celestialStem,
  //         subType: data.subType,
  //         mainType: data.mainType,
  //       }
  //     )
  //   }
  // }, [data]);

  const [errors, setErrors] = useState({
    title: false,
    content: false,
    celestialStem: false,
  });

  // 폼 검증: 천간은 하위 메뉴가 선택되어야 함
  const validateForm = () => {
    const newErrors = {
      title: formData.title.trim() === "",
      content: formData.content.trim() === "",
      celestialStem: selectedStem === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    mutation.mutate(
      {
        uri: `community/${postId}`,
        payload: formData,
      },
      {
        onSuccess: () => navigate(`/community/${postId}`),
        onError: (error) => console.error(error),
      }
    );
    console.log("게시글 수정:", formData);
    // API 호출 로직 추가 가능
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 천간 선택 시 formData 업데이트
  const handleStemSelect = (stem) => {
    setSelectedStem(stem);
    setFormData((prev) => ({
      ...prev,
      subType: stem,
      mainType: stem.charAt(1),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-NanumR">
      <Header />
      <div className="flex flex-col gap-4 p-4">
        {/* 천간 선택 드롭다운 */}
        <CelestialStemDropdown
          selectedStem={selectedStem}
          setSelectedStem={handleStemSelect}
        />
        {errors.celestialStem && <ErrorBubble>천간을 선택해주세요</ErrorBubble>}

        {/* 제목 입력 */}
        <div>
          <Input
            name="title"
            placeholder="제목을 입력하세요"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          {errors.title && <ErrorBubble>제목을 입력해주세요</ErrorBubble>}
        </div>

        {/* 내용 입력 */}
        <div>
          <textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleInputChange}
            className="w-full h-64 bg-white p-4 text-base border border-gray-300 rounded-md 
            "
          />
          {errors.content && <ErrorBubble>내용을 입력해주세요</ErrorBubble>}
        </div>

        <MainButton
          onClick={handleSubmit}
          className="w-full py-3 bg-[#ff7070] text-white rounded-md text-sm shadow-lg hover:opacity-90 active:scale-95 transition"
        >
          수정하기
        </MainButton>
      </div>
    </div>
  );
}

function Header() {
  const navigate = useNavigate();

  return (
    <header className="relative h-12 flex-shrink-0 bg-black text-white flex items-center justify-center">
      <h1 className="text-lg font-bold">게시글 수정</h1>
      <div
        className="absolute left-4 text-xl cursor-pointer text-white "
        onClick={() => navigate("/community")}
      >
        <IoArrowBack />
      </div>
    </header>
  );
}
export default CommunityModify

;
