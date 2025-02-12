package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.common.util.ChatRedisUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ChatMessageService {

    private final ChatRedisUtil chatRedisUtil;

    public Mono<ChatMessage> send(ChatMessage chatMessage) {
        ChatMessage validMessage = createChatMessage(chatMessage);
        chatRedisUtil.createCache(validMessage); // Redis stream에 채팅 메시지 저장
        return Mono.just(validMessage); // 비동기로 응답
    }

    private ChatMessage createChatMessage(ChatMessage chatMessage) {
        chatMessage.validateMessageType();
        return ChatMessage.builder()
                .chatroomId(chatMessage.getChatroomId())
                .content(chatMessage.getContent())
                .senderId(chatMessage.getSenderId())
                .sendTime(LocalDateTime.now()) // 생성 시간 설정
                .messageType(chatMessage.getMessageType())
                .build();
    }
}
