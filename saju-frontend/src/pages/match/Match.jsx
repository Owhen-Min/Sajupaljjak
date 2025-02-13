import React, { useState, useEffect } from "react";
import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList2 from "../../components/UserList2";
import { useInfiniteGet } from "../../hooks/useInfiniteGet";
import { testUsers } from "../../data/user";

function Match() {
  // const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteGet("/api/match");

  // console.log(data);
  // if (isLoading) return <div>로딩중 ...</div>;  
  // if (error) return <div>에러 : {error.message}</div>;

  const handleScroll = () =>{

  };  
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading]);


  return (
    <div className="match-page h-screen flex flex-col relative py-14 px-5">
      <TopBar />
      <UserList2 users={testUsers} />
      <BottomNav />
    </div>
  );
}

export default Match;
