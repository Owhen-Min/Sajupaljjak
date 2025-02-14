import React, { useState, useEffect } from "react";
import BottomNav from "../../components/BottomNav";
import TopBar from "../../components/TopBar";
import UserList2 from "../../components/UserList2";
import { useInfiniteGet } from "../../hooks/useInfiniteGet";
<<<<<<< HEAD
import { testUsers } from "../../data/user";

function Match() {
  // const { data, fetchNextPage, hasNextPage, error, isLoading } = useInfiniteGet("/api/match");

  // console.log(data);
  // if (isLoading) return <div>로딩중 ...</div>;  
  // if (error) return <div>에러 : {error.message}</div>;

  const handleScroll = () =>{

  };  
=======
import AnimationHeartLoader from "../../components/AnimationHeartLoader";
import { TypeAnimation } from "react-type-animation";

function Match() {
  const { data, fetchNextPage, hasNextPage, error, isLoading } =
    useInfiniteGet("/api/match");

  console.log(data);
  if (isLoading)
    return (
      <div className="flex w-full h-screen items-center justify-center flex-col bg-red-100 gap-y-4">
        <AnimationHeartLoader />
        <TypeAnimation
          sequence={[
            1000,
            "매칭 상대방 검색중...", // Types 'One'
            20000, // Waits 1s
            // "매칭 상대방을 검색중 입니다", // Deletes 'One' and types 'Two'
            // 2000, // Waits 2s
            // "잠시만 기다려주세요",
            // 20000, // Types 'Three' without deleting 'Two'
            () => {
              console.log("Sequence completed");
            },
          ]}
          wrapper="span"
          cursor={true}
          repeat={Infinity}
          style={{
            color: "#ff7270",
            fontWeight: 700,
            fontSize: "16px",
            display: "inline-block",
          }}
        />
      </div>
    );
  if (error) return <div>에러 : {error.message}</div>;

  const handleScroll = () => {};
>>>>>>> front
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [isLoading]);

<<<<<<< HEAD

  return (
    <div className="match-page h-screen flex flex-col relative py-14 px-5">
      <TopBar />
      <UserList2 users={testUsers} />
=======
  return (
    <div className="match-page h-screen flex flex-col relative py-14 px-5">
      <TopBar />
      {/* {isLoading ? <MagnifyingGlass /> : <UserList2 users={data} />} */}
      {isLoading ? <MagnifyingGlass /> : <UserList2 users={testUsers} />}

>>>>>>> front
      <BottomNav />
    </div>
  );
}

export default Match;
