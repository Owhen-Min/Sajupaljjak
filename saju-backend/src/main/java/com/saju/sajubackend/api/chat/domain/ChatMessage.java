package com.saju.sajubackend.api.chat.domain;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import com.saju.sajubackend.common.validator.MessageTypeValidator;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Document(collection = "chat_message")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    @Id
    private String id;

    private Long chatroomId;

    private String content;

    private Long senderId;

    private LocalDateTime sendTime;

    @CreatedDate
    private String messageType;

    public ChatMessage(Long chatroomId, String content, Long senderId, LocalDateTime sendTime, String messageType) {
        this.chatroomId = chatroomId;
        this.content = content;
        this.senderId = senderId;
        this.sendTime = sendTime;
        this.messageType = messageType;
    }

    public void validateMessageType() {
        if (!MessageTypeValidator.isValidType(this.messageType)) {
            throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_MESSAGE_CODE);
        }
    }
}
