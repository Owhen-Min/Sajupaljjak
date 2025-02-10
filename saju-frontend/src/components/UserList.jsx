import UserCard from "./UserCard";

const UserList = ({ users }) => {
  return (
    <div className="flex overflow-x-auto w-full gap-6 pl-8 pr-8 snap-x snap-mandatory scrollbar-hidden" >
      {users.map((user) => (
        <div key={user.id} className="snap-center shrink-0 w-[90%]">
          <UserCard user={user} />
        </div>
      ))}
    </div>
    
  );
};

export default UserList;
