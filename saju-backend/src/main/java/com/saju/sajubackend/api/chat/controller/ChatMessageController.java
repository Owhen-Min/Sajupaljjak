package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.dto.response.ChatroomResponseDto;
import com.saju.sajubackend.api.chat.service.ChatMessageService;
import com.saju.sajubackend.api.chat.service.ChatroomService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;

@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final ChatroomService chatroomService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chats")
    public void sendMessage(ChatMessage chatMessage) {
        // 채팅 메시지 전송
        ChatMessage message = chatMessageService.send(chatMessage);
        messagingTemplate.convertAndSend("/topic/" + message.getChatroomId(), message);

        // 채팅방 목록 갱신
//        ChatroomResponseDto chatroom = chatroomService.updateChatroom(chatMessage);
//        messagingTemplate.convertAndSend("/topic/list" + chatroom.getPartner().getMemberId(), chatroom);
    }

    @SubscribeMapping("/list/{memberId}")
    public List<ChatroomResponseDto> sendAllChatRooms(@PathVariable Long memberId) { // todo : 토큰에서 memberId 꺼내도록 수정
        return chatroomService.getAllChatrooms(memberId);
    }
}
