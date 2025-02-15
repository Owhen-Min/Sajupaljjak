import React from 'react';
import {TopBar2} from '../../components/TopBar2';
import ArticleList from '../../components/ArticleList';
import { useNavigate } from 'react-router-dom';
import { useGet } from "../../hooks/useApi";


function MyPageComments() {
  const navigate = useNavigate();
  const { data, isPending, error } = useGet("/api/community/my-comment");
  if (isPending) return <div>로딩중 ...</div>;
  if (error) return <div>에러 : {error.message}</div>;

  return (
    <div className="flex flex-col relative pt-14 h-screen">
      <TopBar2 mainText={"내가 쓴 댓글"} />
      <ArticleList articles={data} className="" />
    </div>
  );
}

export default MyPageComments;