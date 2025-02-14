package com.saju.sajubackend.api.chat.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class LastMessageResponseDto {

    private String lastMessage;

    private LocalDateTime lastSendTime;

    private Integer newMessageCount;

    @Builder
    private LastMessageResponseDto(String lastMessage, LocalDateTime lastSendTime, Integer newMessageCount) {
        this.lastMessage = lastMessage;
        this.lastSendTime = lastSendTime;
        this.newMessageCount = newMessageCount;
    }
}
