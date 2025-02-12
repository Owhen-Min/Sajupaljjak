
import { Link, useLocation } from "react-router-dom";
const getTitleFromPath = (pathname) => {
  if (pathname.startsWith("/solo")) return "솔로";
  if (pathname.startsWith("/chats")) return "채팅";
  if (pathname.startsWith("/community")) return "커뮤니티";
  if (pathname.startsWith("/fortune")) return "운세";
  if (pathname.startsWith("/match")) return "매칭";
  if (pathname.startsWith("/mypage")) return "마이페이지";
  if (pathname.startsWith("/couple")) return "커플";
  return "";
};

const TopBar = () => {
  const location = useLocation();
  const title = getTitleFromPath(location.pathname);

  return (
    <header className="w-full px-4 py-2 flex justify-between items-center absolute top-0 left-0 bg-white border-b border-gray-200">
      <div>
        {/* <div className="text-2xl font-noto pl-1">{title}</div> */}
        <div className="text-3xl font-gapyeong pl-1">{title}</div>
      </div>
      <div>
        <Link to="/mypage">
          <button className="flex items-center focus:outline-none">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCm6U-R7Dh4WAGASSJFN9RaPTnxmDeV1cVqitzJ1yXslCORiVstDy8rB0YgI5YCRkCJo&usqp=CAU"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </button>
        </Link>

      </div>
    </header>
  );
};

export default TopBar;
