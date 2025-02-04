import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import TopBar from "../components/TobBar";
import UserList from "../components/UserList";
import { testUsers } from "../data/user";

function Match() {
  const [users, setUsers] = useState(testUsers);
  const [isLoading, setIsLoading] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !isLoading
    ) {
      setIsLoading(true);
      setTimeout(() => {
        setUsers((prevUsers) => [...prevUsers, ...testUsers]);
        setIsLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div>
      <TopBar />
      <UserList users={users} />
      <BottomNav />
    </div>
  );
}

export default Match;
