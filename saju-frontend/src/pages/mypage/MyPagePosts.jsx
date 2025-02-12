import React from 'react';
import TopBar2 from '../../components/TopBar2';
import ArticleList from '../../components/ArticleList';


function MyPagePosts(){
    return (
      <div>
        <TopBar2 mainText={"내가 쓴 글"} />
        <ArticleList/>
      </div>
    );
}

export default MyPagePosts;