  import UserCard from "./UserCard";

  const UserList2 = ({ users }) => {
    return (
      <div className="user-list flex flex-wrap gap-2 justify-center items-center ">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    );
  };

  export default UserList2;
