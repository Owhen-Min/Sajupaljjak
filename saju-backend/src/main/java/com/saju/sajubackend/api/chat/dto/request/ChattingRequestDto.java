package com.saju.sajubackend.api.chat.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChattingRequestDto {

    private String chatroomId;

    private String content;

    private String senderId;

    private String sendTime;

    private String messageType;

    @Builder
    private ChattingRequestDto(String chatroomId, String content, String senderId, String sendTime, String messageType) {
        this.chatroomId = chatroomId;
        this.content = content;
        this.senderId = senderId;
        this.messageType = messageType;
        timestamp();
    }

    private void timestamp() {
        this.sendTime = String.valueOf(LocalDateTime.now());
    }
}
