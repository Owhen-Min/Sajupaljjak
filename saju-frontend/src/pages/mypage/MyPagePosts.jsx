import React from 'react';
import TopBar2 from '../../components/TopBar2';
import ArticleList from '../../components/ArticleList';


function MyPagePosts(){
    return (
      <div className="flex flex-col relative pt-14 h-screen">
        <TopBar2 mainText={"내가 쓴 글"} />
        <ArticleList/>
      </div>
    );
}

export default MyPagePosts;