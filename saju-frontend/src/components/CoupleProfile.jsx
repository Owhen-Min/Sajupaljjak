import SajuUserBubble from "./SajuUserBubble";
import Heart from "./Heart";
import dayjs from "dayjs";
import provinceCode from "../data/provinceCode.json";

function CoupleProfile({ couple }) {
  const diffDays = dayjs().diff(dayjs(couple.startDate), 'day');

  const getRegionName = (code) => {
    const codeStr = code.toString();
    for (const [province, provinceData] of Object.entries(provinceCode.provinces)) {
      for (const [sigungu, sigunguCode] of Object.entries(provinceData.sigungu)) {
        if (sigunguCode === codeStr) {
          const [sido, gugun] = sigungu.split(" ");
          return { sido, gugun };
        }
      }
    }
    return { sido: "알 수 없음", gugun: "" };
  };

  const memberRegion = getRegionName(couple.member.region);
  const partnerRegion = getRegionName(couple.partner.region);

  return (
    <div className="w-11/12 my-3 bg-white rounded-md shadow-md py-5 flex justify-between items-center border-t border-gray-100">
      <div className="flex items-center w-1/5 justify-center">
        <div className="flex flex-col items-center text-center">
          <SajuUserBubble skyElement={couple.member.memberType} size="small" />
          <p className="text-gray-600 text-sm mb-1">{couple.member.age}세</p>
          <p className="text-gray-500 text-xs mb-1">{memberRegion.sido}</p>
          <p className="text-gray-500 text-xs">{memberRegion.gugun}</p>
        </div>
      </div>

      <div className="w-1/5 flex justify-center">
        <div className="flex flex-col items-center text-center">
          <p className="font-bold text-sm mb-1">{couple.member.nickname}</p>
          <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
            <img 
              src={couple.member.profileImage} 
              alt="profile" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="w-1/5 flex justify-center">
        <Heart score={diffDays} size="small" />
      </div>

      <div className="w-1/5 flex justify-center">
        <div className="flex flex-col text-center items-center justify-center">
          <p className="font-bold text-sm mb-1">{couple.partner.nickname}</p>
          <div className="w-[60px] h-[60px] overflow-hidden rounded-full">
            <img 
              src={couple.partner.profileImage} 
              alt="profile" 
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      <div className="w-1/5 flex justify-center">
        <div className="flex flex-col text-center items-center justify-center">
          <SajuUserBubble skyElement={couple.partner.memberType} size="small" />
          <p className="text-gray-600 text-sm mb-1">{couple.partner.age}세</p>
          <p className="text-gray-500 text-xs mb-1">{partnerRegion.sido}</p>
          <p className="text-gray-500 text-xs">{partnerRegion.gugun}</p>
        </div>
      </div>
    </div>
  );
}

export default CoupleProfile; 