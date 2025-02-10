import React from "react";
import { TopBar2 } from "../../components/TopBar2";
import ArticleList from "../../components/ArticleList";

function MyPageLiked() {
  return (
    <div>
      <TopBar2 mainText={"좋아요한 글"} />
      <ArticleList />
    </div>
  );
}

export default MyPageLiked;
