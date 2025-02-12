package com.saju.sajubackend.api.chat.domain;

import com.saju.sajubackend.api.member.domain.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "CHATROOM_MEMBER")
public class ChatroomMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatroom_member_id")
    private Long chatroomMemberId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_id", nullable = false)
    private Chatroom chatroom;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = true;

    @Column(name = "last_read_message")
    private String lastReadMessage;

    @Builder
    private ChatroomMember(Long chatroomMemberId, Member member, Chatroom chatroom, Boolean isActive, String lastReadMessage) {
        this.chatroomMemberId = chatroomMemberId;
        this.member = member;
        this.chatroom = chatroom;
        this.isActive = isActive;
        this.lastReadMessage = lastReadMessage;
    }
}
