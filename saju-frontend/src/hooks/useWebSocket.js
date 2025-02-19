import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const clientRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  useEffect(() => {
    const connectWebSocket = () => {
      console.log("웹소켓 연결 시도");
      const accessToken = sessionStorage.getItem("accessToken");
      
      const client = new Client({
        brokerURL: "wss://i12a408.p.ssafy.io/ws",
        reconnectDelay: 5000,
        heartbeatIncoming: 0,
        heartbeatOutgoing: 0,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        onConnect: () => {
          console.log("웹소켓 연결 성공");
          setIsConnected(true);
          setStompClient(client);
        },
        onWebSocketClose: () => {
          console.log("WebSocket 연결이 닫힘");
          setIsConnected(false);
        },
        onDisconnect: () => {
          console.log("웹소켓 연결 해제");
          setIsConnected(false);
          setStompClient(null);
          
          // 연결이 끊어졌을 때 재연결 시도
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log("웹소켓 재연결 시도");
            connectWebSocket();
          }, 5000);
        },
        onStompError: (frame) => {
          console.error("Stomp 에러 발생:", frame);
          setIsConnected(false);
          setStompClient(null);
        },
        debug: (str) => {
          console.log("Stomp Debug:", str);
        }
      });

      try {
        client.activate();
        clientRef.current = client;
      } catch (error) {
        console.error("웹소켓 연결 중 에러 발생:", error);
        setIsConnected(false);
        setStompClient(null);
      }
    };

    connectWebSocket();

    return () => {
      console.log("웹소켓 정리 중...");
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (clientRef.current) {
        clientRef.current.deactivate();
        setIsConnected(false);
        setStompClient(null);
      }
    };
  }, []);

  return { stompClient, isConnected };
};

export default useWebSocket;




// import { useEffect, useState } from "react";
// import { Client } from "@stomp/stompjs";
// import { useAuth } from "./useAuth";
// import { useRef } from "react";

// const useWebSocket = () => {
//   const [stompClient, setStompClient] = useState(null);
//   // const { accessToken } = useAuth();
//   const clientRef = useRef(null);

//   useEffect(() => {
//     console.log("웹소켓 연결 시도");
//     //auth로 받아오게 수정 필요
//     const accessToken = sessionStorage.getItem("accessToken");
//     console.log("accessToken", accessToken);
//     const client = new Client({
//       brokerURL: "wss://i12a408.p.ssafy.io/ws",
//       reconnectDelay: 5000,
//       connectHeaders: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       onConnect: () => {
//         console.log("웹소켓 연결 성공");
//       },
//       onDisconnect: () => {
//         console.log("웹소켓 연결 실패");
//       },
//       onStompError: (frame) => {
//         console.error("에러 발생:", frame);
//       },
//     });

//     client.activate();
//     clientRef.current = client;
//     setStompClient(client);

//     return () => {
//       console.log("웹소켓 해제");
//       client.deactivate();
//     };
//   }, []);

//   return { stompClient };
// };

// export default useWebSocket;
