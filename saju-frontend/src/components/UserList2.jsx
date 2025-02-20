// UserList2.jsx
import React from "react";
import UserCard2 from "./UserCard2";

const UserList2 = ({ users }) => {
  if (!users || users.length === 0) {
    return <div>유저가 없습니다.</div>;
  }
  return (
    <div className="grid grid-cols-2 gap-4 p-4 container mx-auto">
      {users.map((user) => (
        <UserCard2 key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList2;
