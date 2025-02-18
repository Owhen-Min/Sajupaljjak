import { useEffect, useState, useRef } from "react";
import { Client } from "@stomp/stompjs";

const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const clientRef = useRef(null);

  useEffect(() => {
    console.log("웹소켓 연결 시도");
    const accessToken = localStorage.getItem("accessToken");
    console.log("accessToken", accessToken);
    
    const client = new Client({
      brokerURL: "wss://i12a408.p.ssafy.io/ws",
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
      onConnect: () => {
        console.log("웹소켓 연결 성공");
        setIsConnected(true);
      },
      onDisconnect: () => {
        console.log("웹소켓 연결 실패");
        setIsConnected(false);
      },
      onStompError: (frame) => {
        console.error("에러 발생:", frame);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      console.log("웹소켓 해제");
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  return { stompClient: clientRef.current, isConnected };
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
//     const accessToken = localStorage.getItem("accessToken");
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
