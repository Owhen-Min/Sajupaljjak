package com.saju.sajubackend.api.chat.domain;

import com.saju.sajubackend.api.member.domain.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_read_id", nullable = false)
    private Message lastReadMessage;

    @Builder
    private ChatroomMember(Long chatroomMemberId, Member member, Chatroom chatroom, Boolean isActive,
                          Message lastReadMessage) {
        this.chatroomMemberId = chatroomMemberId;
        this.member = member;
        this.chatroom = chatroom;
        this.isActive = isActive;
        this.lastReadMessage = lastReadMessage;
    }
}
