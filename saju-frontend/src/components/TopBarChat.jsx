import BackButtonChat from "./BackButtonChat";

export const TopBar2 = ({payload, mainText }) => {
  return (
    <div className="bg-white border-b z-10 border-gray-200 top-bar2 w-full flex items-center justify-center h-12 absolute top-0 py-7 left-0">
			 <BackButtonChat url="chats" payload={payload} />
      <div className="main-text w-full text-center font-gapyeong text-2xl">
        {mainText}
      </div>
    </div>
  );
};

export default TopBar2;
