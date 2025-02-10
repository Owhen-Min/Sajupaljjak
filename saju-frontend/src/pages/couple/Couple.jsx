import BottomNav from "../../components/BottomNav";
import Heart from "../../components/Heart";
import TopBar from "../../components/TopBar";
import useGet from "../../hooks/useGet";

function Couple() {

  //  const { data, isLoading, error } = useGet("/api/couples", "getCouples");

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Something went wrong: {error.message}</p>;

    const data = [
      {
        member: {
          name: "윤수정",
          nickname: "수정나무",
          memberType: "기토",
          age: 29,
          profileImage: "https://~",
          region: "서울시 동작구",
        },
        partner: {
          name: "박효신",
          nickname: "대장나무",
          memberType: "계수",
          age: 29,
          profileImage: "https://~",
          region: "서울시 용산구",
        },
      },
    ];

  const { member, partner } = data?.data || {};
console.log(member, partner)
  return (
    <div>
      <TopBar />
      <Heart score={30}/>

      {/* <div className="flex flex-col items-center gap-6 p-6">
      <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md w-72">
        <img
          // src={member.profileImage}
          alt={member.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-bold">
            {member.name} ({member.nickname})
          </h3>
          <p className="text-sm text-gray-600">Type: {member.memberType}</p>
          <p className="text-sm text-gray-600">Age: {member.age}</p>
          <p className="text-sm text-gray-600">Region: {member.region}</p>
        </div>
      </div> */}

      {/* <div className="flex items-center gap-4 bg-gray-100 p-4 rounded-lg shadow-md w-72">
        <img
          // src={partner.profileImage}
          alt={partner.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-xl font-bold">
            {partner.name} ({partner.nickname})
          </h3>
          <p className="text-sm text-gray-600">Type: {partner.memberType}</p>
          <p className="text-sm text-gray-600">Age: {partner.age}</p>
          <p className="text-sm text-gray-600">Region: {partner.region}</p>
        </div>
      </div>
    </div> */}
     

      <BottomNav />
    </div>
  );
}

export default Couple;