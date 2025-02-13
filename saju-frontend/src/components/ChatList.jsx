import { useNavigate } from "react-router-dom";

const ChatList = ({ chats }) => {
  const navigate = useNavigate();

  function formatRelativeTime(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInMinutes < 60) {
      return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
      return `${diffInHours}시간 전`;
    } else if (diffInDays < 30) {
      return `${diffInDays}일 전`;
    } else {
      return dateString;
    }
  }

  const handleChatClick = (chatRoomId) => {
    navigate(`/chats/${chatRoomId}`); // 채팅방으로 이동
  };

  return (
    <div className="flex flex-col h-full">
      {Object.entries(chats[0])
        .sort(([, a], [, b]) => new Date(b.message.lastSendTime) - new Date(a.message.lastSendTime))
        .map(([chatRoomId, chatData]) => (
          <div
            key={chatRoomId}
            className="chat-card flex items-center justify-between bg-white px-3 py-3 mb- rounded-md border border-gray-200 shadow-lg cursor-pointer opacity-90 hover:opacity-100 transition"
            onClick={() => handleChatClick(chatRoomId)}
          >
            <div className="flex w-2/12 justify-center items-center">
              <img
                src={chatData.chatRoom.partner.profileImage}
                alt="profile"
                className="w-14 h-14 rounded-full object-cover object-center"
              />
            </div>
            <div className="flex w-7/12 flex-col">
              <h3 className="text-lg font-semibold">{chatData.chatRoom.partner.nickname}</h3>
              <p className="w-full truncate text-gray-700">
                {chatData.message.lastMessage}
              </p>
            </div>
            <div className="flex w-2/12 flex-col items-end gap-y-1">
              <span className="text-sm text-gray-500">
                {formatRelativeTime(chatData.message.lastSendTime)}
              </span>
              <span className={`text-sm text-white bg-red-500 h-7 w-7 rounded-full py-1 text-center ${chatData.message.newMessageCount > 0 ? 'block' : 'opacity-0'}`}>
                {chatData.message.newMessageCount}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ChatList;
