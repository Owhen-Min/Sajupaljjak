import { Routes, Route } from 'react-router-dom';
import Chats from '../pages/chats/Chats';
import ChatRandom from '../pages/chats/ChatRandom';
import Chat from '../pages/chats/Chat';
import ChatVideo from '../pages/chats/ChatVideo';

function ChatsRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Chats />} />
      <Route path="random" element={<ChatRandom />} />
      <Route path=":chatId" element={<Chat />} />
      {/* <Route path=":chatId/video" element={<ChatVideo />} /> */}
    </Routes>
  );
}

export default ChatsRoutes;
