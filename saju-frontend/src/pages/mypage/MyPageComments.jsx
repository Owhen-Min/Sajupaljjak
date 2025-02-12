import React from 'react';
import {TopBar2} from '../../components/TopBar2';
import ArticleList from '../../components/ArticleList';
import { useNavigate } from 'react-router-dom';

function MyPageComments() {
  const navigate = useNavigate();
  return (
    <div>
      <TopBar2 mainText={"내가 쓴 댓글"} />
      <ArticleList/>

    </div>
  );
}

export default MyPageComments;