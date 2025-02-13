package com.saju.sajubackend.api.chat.controller;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.service.ChatMessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chats")
    public void sendMessage(ChatMessage chatMessage) {
        ChatMessage message = chatMessageService.send(chatMessage);
        messagingTemplate.convertAndSend("/topic/" + message.getChatroomId(), message);
    }
}
