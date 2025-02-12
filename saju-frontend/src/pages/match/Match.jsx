import React, { useState, useEffect } from "react";
import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList2 from "../../components/UserList2";
import { useInfiniteGet } from "../../hooks/useInfiniteGet";

function Match() {
  const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteGet("/api/match");

  console.log(data);
  if (isLoading) return <div>로딩중 ...</div>;  
  if (error) return <div>에러 : {error.message}</div>;

  const handleScroll = () =>{

  };  
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading]);


  return (
    <div>
      <TopBar />
      <UserList2 users={data} />
      <BottomNav />
    </div>
  );
}

export default Match;
