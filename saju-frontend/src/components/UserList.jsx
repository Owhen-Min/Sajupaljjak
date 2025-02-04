import UserCard from "./UserCard";

const UserList = ({ users }) => {
  return (
    <div className="user-list flex flex-wrap gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UserList;
