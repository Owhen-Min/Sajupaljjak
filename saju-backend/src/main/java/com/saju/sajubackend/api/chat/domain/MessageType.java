package com.saju.sajubackend.api.chat.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "MESSAGE_TYPE")
public class MessageType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_type_id")
    private Long messageTypeId;

    @Column(nullable = false, length = 15)
    private String type;

    @Builder
    private MessageType(Long messageTypeId, String type) {
        this.messageTypeId = messageTypeId;
        this.type = type;
    }
}
