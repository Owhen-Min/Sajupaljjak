package com.saju.sajubackend.api.chat.domain;

import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.converter.MessageTypeConverter;
import com.saju.sajubackend.common.enums.MessageType;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "MESSAGE")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long messageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "sender_id", nullable = false)
    private Member sender;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_id", nullable = false)
    private Chatroom chatroom;

    @Column(nullable = false, length = 300)
    private String content;

    @CreatedDate
    @Column(name = "send_time", nullable = false)
    private LocalDateTime sendTime;

    @Convert(converter = MessageTypeConverter.class)
    @Column
    private MessageType messageType;

    @Builder
    private Message(Long messageId, Member sender, Chatroom chatroom, String content, LocalDateTime sendTime,
                   MessageType messageType) {
        this.messageId = messageId;
        this.sender = sender;
        this.chatroom = chatroom;
        this.content = content;
        this.sendTime = sendTime;
        this.messageType = messageType;
    }
}

