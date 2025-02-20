import { useEffect, useRef, useState } from "react";

const MessageList = ({ messages }) => {
  const [showScrollBottom, setShowScrollBottom] = useState(false);
  const messageEndRef = useRef(null);
  const containerRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 스크롤 위치에 따라 버튼 표시 여부 결정
  useEffect(() => {
    const container = containerRef.current;
    
    const toggleScrollButton = () => {
      if (!container) return;
      
      const { scrollHeight, scrollTop, clientHeight } = container;
      const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);
      
      // 컨테이너 높이의 2배 이상 위에 있을 때만 버튼 표시
      setShowScrollBottom(distanceFromBottom > clientHeight * 2);
    };

    container?.addEventListener('scroll', toggleScrollButton);
    return () => container?.removeEventListener('scroll', toggleScrollButton);
  }, []);

  // 초기 로딩 시 스크롤
  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      messageEndRef.current?.scrollIntoView();
      setIsInitialLoad(false);
    }
  }, [messages, isInitialLoad]);

  // 새 메시지가 추가될 때 스크롤 처리
  useEffect(() => {
    const container = containerRef.current;
    if (!container || messages.length === 0) return;

    // 마지막 메시지가 내가 보낸 메시지이거나 초기 로딩인 경우 무조건 스크롤
    const lastMessage = messages[messages.length - 1];
    if (lastMessage.isMine || isInitialLoad) {
      messageEndRef.current?.scrollIntoView({ behavior: 'instant' });
      return;
    }

    // 그 외의 경우는 기존 로직 유지
    const { scrollHeight, scrollTop, clientHeight } = container;
    const distanceFromBottom = scrollHeight - (scrollTop + clientHeight);

    if (distanceFromBottom < clientHeight * 2) {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isInitialLoad]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatMessageTime = (isoString) => {
    const messageDate = new Date(isoString);
    const now = new Date();
    const isToday = messageDate.toDateString() === now.toDateString();
    
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? '오후' : '오전';
    const displayHours = hours % 12 || 12;
    
    if (isToday) {
      return `${ampm} ${displayHours}:${minutes}`;
    } else {
      const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
      const day = messageDate.getDate().toString().padStart(2, '0');
      return `${month}/${day} ${displayHours}:${minutes}`;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="flex flex-col gap-4 p-4 h-full overflow-y-auto relative scrollbar-hide"
    >
      {messages.map((message, index) => {
        // 다음 메시지의 시간과 비교하여 시간 표시 여부 결정
        const showTime = index === messages.length - 1 || 
          formatMessageTime(message.sentAt) !== formatMessageTime(messages[index + 1].sentAt);

        return (
          <div
            key={message.id}
            className={`flex ${message.isMine ? 'justify-end' : 'justify-start'}`}
          >
            {!message.isMine && (
              <div className="flex-shrink-0 mr-2">
                <img
                  src={message.profileImage}
                  alt="프로필"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            )}
            <div className={`flex flex-col ${message.isMine ? 'items-end' : 'items-start'}`}>
              {!message.isMine && (
                <span className="text-sm text-gray-600 mb-1">{message.nickName}</span>
              )}
              <div
                className={`rounded-lg p-3 inline-block ${
                  message.isMine
                    ? 'bg-blue-500 text-white max-w-[80%]' 
                    : 'bg-gray-200 text-black max-w-[70%]'
                }`}
                style={{ wordBreak: 'keep-all' }}
              >
                {message.message}
              </div>
              {showTime && (
                <span className="text-xs text-gray-500 mt-1">
                  {formatMessageTime(message.sentAt)}
                </span>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messageEndRef} />
      
      {showScrollBottom && (
        <button
          onClick={scrollToBottom}
          aria-label="최신 메시지로"
          className={`
            fixed
            bottom-20
            right-4
            w-10
            h-10
            z-20
            bg-gray-700
            text-white
            rounded-full
            flex
            items-center
            justify-center
            cursor-pointer
            hover:bg-gray-600
            transition-all
            duration-300
            shadow-lg
          `}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default MessageList;
