import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

const useWebSocket = (shouldConnect) => {
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
		// 채팅방, 채팅목록 페이지에서만 웹소켓 연결되게게
    if (!shouldConnect) {
      return;
    }

		//웹소켓 연결
    const client = new Client({
      brokerURL: "ws://i12a408.p.ssafy.io/ws",
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("웹소켓 연결");
      },
      onDisconnect: () => {
        console.log("웹소켓 연결 종료");
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
  }, [shouldConnect]);

	//웹소켓 관리하는 객체 반환환
  return { stompClient };
};

export default useWebSocket;
