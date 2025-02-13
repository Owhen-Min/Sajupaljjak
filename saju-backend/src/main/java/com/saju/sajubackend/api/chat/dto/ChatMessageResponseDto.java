package com.saju.sajubackend.api.chat.dto;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChatMessageResponseDto {

    private String chatroomId;
    private String content;
    private String senderId;
    private String sendTime;
    private String messageType;

    @Builder
    private ChatMessageResponseDto(String chatroomId, String content, String senderId, String sendTime, String messageType) {
        this.chatroomId = chatroomId;
        this.content = content;
        this.senderId = senderId;
        this.sendTime = sendTime;
        this.messageType = messageType;
    }

    public static ChatMessageResponseDto fromDocument(ChatMessage chatMessage) {
        return ChatMessageResponseDto.builder()
                .content(chatMessage.getContent())
                .senderId(chatMessage.getSenderId())
                .sendTime(chatMessage.getSendTime())
                .messageType(chatMessage.getMessageType())
                .build();
    }
}
