import React from 'react';
import TopBar2 from '../../components/TopBar2';
import ArticleList from '../../components/ArticleList';
import { useGet } from "../../hooks/useApi";

function MyPagePosts(){
    const { data, isLoading, error } = useGet("/api/community/my-posts");
    if (isLoading) return <div>로딩중 ...</div>;
    if (error) return <div>에러 : {error.message}</div>;
    return (
      <div className="flex flex-col relative pt-14 h-screen">
        <TopBar2 mainText={"내가 쓴 글"} />
        <ArticleList articles={data} className="" />
      </div>
    );
}

export default MyPagePosts;