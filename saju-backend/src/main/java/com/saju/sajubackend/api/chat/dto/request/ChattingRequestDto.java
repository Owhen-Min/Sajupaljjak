package com.saju.sajubackend.api.chat.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.validator.MessageTypeValidator;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class ChattingRequestDto {

    @JsonProperty("chatRoomId")
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

    public void validateMessageType() {
        if (messageType == null) throw new BadRequestException(ErrorMessage.INVALID_MESSAGE_LABEL);
        
        if (!MessageTypeValidator.isValidType(this.messageType)) {
            throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_MESSAGE_CODE);
        }
    }

    public static ChattingRequestDto fromEntity(ChatMessage chatMessage) {
        return ChattingRequestDto.builder()
                .chatroomId(chatMessage.getChatroomId())
                .content(chatMessage.getContent())
                .senderId(chatMessage.getSenderId())
                .messageType(chatMessage.getMessageType())
                .sendTime(chatMessage.getSendTime())
                .build();

    }
}
