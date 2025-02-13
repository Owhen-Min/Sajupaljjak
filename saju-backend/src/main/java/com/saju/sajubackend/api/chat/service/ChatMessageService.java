package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.repository.ChatMemberQueryDslRepository;
import com.saju.sajubackend.api.chat.repository.ChatMessageRepository;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@RequiredArgsConstructor
@Service
public class ChatMessageService {

    private final ChatMemberQueryDslRepository chatMemberQueryDslRepository;
    private final ChatMessageRepository chatMessageRepository;

    public ChatMessage send(ChatMessage chatMessage) {
        isValid(chatMessage);
        ChatMessage validMessage = createChatMessage(chatMessage);
        chatMessageRepository.save(validMessage);
        return validMessage;
    }

    private void isValid(ChatMessage chatMessage) {
        chatMessage.validateMessageType();
        Long chatroomId = Long.parseLong(chatMessage.getChatroomId());
        Long memberId = Long.parseLong(chatMessage.getSenderId());

        if (!chatMemberQueryDslRepository.existsByChatroomAndMember(chatroomId, memberId))
            throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_CHAT_ROOM_ID);
    }

    private ChatMessage createChatMessage(ChatMessage chatMessage) {
        return ChatMessage.builder()
                .chatroomId(chatMessage.getChatroomId())
                .content(chatMessage.getContent())
                .senderId(chatMessage.getSenderId())
                .sendTime(LocalDateTime.now().toString()) // 생성 시간 설정
                .messageType(chatMessage.getMessageType())
                .build();
    }
}
