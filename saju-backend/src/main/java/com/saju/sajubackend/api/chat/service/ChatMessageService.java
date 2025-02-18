package com.saju.sajubackend.api.chat.service;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.dto.request.ChattingRequestDto;
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

    public ChattingRequestDto send(ChattingRequestDto request) {
        System.out.println("[👍메시지 전송 요청 - ChatMessageService]");
        System.out.println("[👍chatroomId] : " + request.getChatroomId());
        System.out.println("[👍senderId] : " + request.getSenderId());
        isValid(request);
        ChatMessage validMessage = createChatMessage(request);
        chatMessageRepository.save(validMessage);
        return ChattingRequestDto.fromEntity(validMessage);
    }

    private void isValid(ChattingRequestDto message) {
        message.validateMessageType();
        Long chatroomId = Long.parseLong(message.getChatroomId());
        Long memberId = Long.parseLong(message.getSenderId());

        if (!chatMemberQueryDslRepository.existsByChatroomAndMember(chatroomId, memberId))
            throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_CHAT_ROOM);
    }

    private ChatMessage createChatMessage(ChattingRequestDto message) {
        return ChatMessage.builder()
                .chatroomId(message.getChatroomId())
                .content(message.getContent())
                .senderId(message.getSenderId())
                .sendTime(LocalDateTime.now().toString()) // 생성 시간 설정
                .messageType(message.getMessageType())
                .build();
    }
}
