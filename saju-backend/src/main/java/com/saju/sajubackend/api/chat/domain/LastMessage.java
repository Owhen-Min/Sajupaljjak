package com.saju.sajubackend.api.chat.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "last_message")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LastMessage {

    @Id
    private String id;

    private String chatroomId;

    private String memberId;

    private String lastMessageId;

    private String content;

    private String lastMessageTime;
}
