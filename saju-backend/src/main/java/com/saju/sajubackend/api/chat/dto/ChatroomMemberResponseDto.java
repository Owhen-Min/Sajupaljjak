package com.saju.sajubackend.api.chat.dto;

import com.saju.sajubackend.api.member.domain.Member;
import lombok.Builder;

public class ChatroomResponseDto {

    private Long chatroomId;

    private ChatMemberResponseDto member;

    private ChatMemberResponseDto partner;

    @Builder
    private ChatroomResponseDto(Long chatroomId, ChatMemberResponseDto member, ChatMemberResponseDto partner) {
        this.chatroomId = chatroomId;
        this.member = member;
        this.partner = partner;
    }

    public static ChatroomResponseDto fromEntity(Long chatroomId, Member member, Member partner) {
        return ChatroomResponseDto.builder()
                .chatroomId(chatroomId)
                .member(ChatMemberResponseDto.fromEntity(member))
                .partner(ChatMemberResponseDto.fromEntity(partner))
                .build();
    }
}
