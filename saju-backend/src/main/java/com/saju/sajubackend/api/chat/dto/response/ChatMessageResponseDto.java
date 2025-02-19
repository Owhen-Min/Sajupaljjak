package com.saju.sajubackend.api.chat.dto.response;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ChatMessageResponseDto {

    private String id;
    private String content;
    private String senderId;
    private String sendTime;
    private String messageType;

    @Builder
    private ChatMessageResponseDto(String id, String content, String senderId, String sendTime, String messageType) {
        this.id = id;
        this.content = content;
        this.senderId = senderId;
        this.sendTime = sendTime;
        this.messageType = messageType;
    }

    public static ChatMessageResponseDto fromDocument(ChatMessage chatMessage) {
        return ChatMessageResponseDto.builder()
                .id(chatMessage.getId())
                .content(chatMessage.getContent())
                .senderId(chatMessage.getSenderId())
                .sendTime(chatMessage.getSendTime())
                .messageType(chatMessage.getMessageType())
                .build();
    }
}
