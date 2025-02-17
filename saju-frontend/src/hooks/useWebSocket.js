import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import { useAuth } from "./useAuth";

const useWebSocket = () => {
  const [stompClient, setStompClient] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    // if (!accessToken) return;
    //웹소켓 연결
    const client = new Client({
      // brokerURL: "wss://i12a408.p.ssafy.io/ws",
      webSocketFactory: () => new WebSocket("wss://i12a408.p.ssafy.io/ws"),
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        console.log("웹소켓 연결 111");
      },
      onDisconnect: () => {
        console.log("웹소켓 연결 종료 111");
      },
      onStompError: (frame) => {
        console.error("에러러 발생:", frame);
      },
    });

    client.activate();
    setStompClient(client);

    return () => {
      console.log("웹소켓 해제");
      client.deactivate();
    };
  }, []);

  //웹소켓 관리하는 객체 반환환
  return { stompClient };
};

export default useWebSocket;
