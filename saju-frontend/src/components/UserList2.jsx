
import React from "react";
import UserCard2 from "./UserCard2";

const UserList2 = ({ users }) => {
  if (!Array.isArray(users) || users.length === 0) {
    return <div>유저가 없습니다.</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 container mx-auto">
      {users.map((user, index) =>
        user?.id ? <UserCard2 key={user.id} user={user} /> : null
      )}
    </div>
  );
};


export default UserList2;
