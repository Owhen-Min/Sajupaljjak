package com.saju.sajubackend.api.chat.dto.response;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.domain.LastMessage;
import java.util.Objects;
import lombok.Builder;
import lombok.Getter;

@Getter
public class LastMessageResponseDto {

    private String lastMessage;

    private String lastSendTime;

    private Long newMessageCount;

    @Builder
    private LastMessageResponseDto(String lastMessage, String lastSendTime, Long newMessageCount) {
        this.lastMessage = lastMessage;
        this.lastSendTime = lastSendTime;
        this.newMessageCount = newMessageCount;
    }

    public static LastMessageResponseDto fromEntity(LastMessage message, Long newMessageCount) {
        if (Objects.isNull(message)) {
            return null;
        }

        return LastMessageResponseDto.builder()
                .lastMessage(message.getContent())
                .lastSendTime(message.getLastMessageTime())
                .newMessageCount(newMessageCount)
                .build();
    }

    public static LastMessageResponseDto fromEntity(ChatMessage message, Long newMessageCount) {
        if (Objects.isNull(message)) {
            return null;
        }

        return LastMessageResponseDto.builder()
                .lastMessage(message.getContent())
                .lastSendTime(message.getSendTime())
                .newMessageCount(newMessageCount)
                .build();
    }
}
