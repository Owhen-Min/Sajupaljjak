  import UserCard from "./UserCard";

  const UserList2 = ({ users }) => {
    return (
      <div className="grid grid-cols-1 gap-4 p-2 justify-items-center">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    //   <div className="grid grid-cols-1 gap-4 p-2 justify-items-center">
    //   {users.map((user) => (
    //     <UserCard key={user.id} user={user} />
    //   ))}
    // </div>

    );
  };
  

  export default UserList2;
