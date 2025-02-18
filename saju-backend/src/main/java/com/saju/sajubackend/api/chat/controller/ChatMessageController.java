package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.dto.request.ChattingRequestDto;
import com.saju.sajubackend.api.chat.dto.response.ChatroomResponseDto;
import com.saju.sajubackend.api.chat.service.ChatMessageService;
import com.saju.sajubackend.api.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final ChatroomService chatroomService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chats")
    public void sendMessage(@Payload ChattingRequestDto request) {
        System.out.println("[👍메시지 전송 요청 - ChatMessageController]");
        // 채팅 메시지 전송
        ChattingRequestDto message = chatMessageService.send(request);
        messagingTemplate.convertAndSend("/topic/" + message.getChatroomId(), message);

        // 채팅방 목록 갱신
        ChatroomResponseDto chatroom = chatroomService.updateChatroom(request);
        messagingTemplate.convertAndSend("/topic/list" + chatroom.getMemberId(), chatroom);
    }

    @SubscribeMapping("/list/{memberId}")
    public List<ChatroomResponseDto> sendAllChatRooms(@DestinationVariable Long memberId) {
        return chatroomService.getAllChatrooms(memberId);
    }
}
