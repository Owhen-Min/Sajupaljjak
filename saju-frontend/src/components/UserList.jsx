import UserCard from "./UserCard";

const UserList = ({ users }) => {
  return (
    <div className="flex overflow-x-auto w-full gap-2 pl-2 pr-2 snap-x snap-mandatory scrollbar-hidden">
      {users.map((user) => (
        <div key={user.id} className="snap-center shrink-0 w-[100%]">
          <UserCard user={user} />
        </div>
      ))}
    </div>
    
  );
};

export default UserList;
