import useEmblaCarousel from 'embla-carousel-react'
import UserCard from "./UserCard";

const UserList = ({ users }) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps'
  })

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {users.map((user) => (
          <div key={user.id} className="flex-[0_0_90%] min-w-0 pl-8">
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
