package com.saju.sajubackend.api.chat.dto.response;

import com.saju.sajubackend.api.member.domain.Member;
import lombok.Builder;

public class CreateChatroomResponseDto {

    private Long chatroomId;

    private ChatMemberResponseDto member;

    private ChatMemberResponseDto partner;

    @Builder
    private CreateChatroomResponseDto(Long chatroomId, ChatMemberResponseDto member, ChatMemberResponseDto partner) {
        this.chatroomId = chatroomId;
        this.member = member;
        this.partner = partner;
    }

    public static CreateChatroomResponseDto fromEntity(Long chatroomId, Member member, Member partner) {
        return CreateChatroomResponseDto.builder()
                .chatroomId(chatroomId)
                .member(ChatMemberResponseDto.fromEntity(member))
                .partner(ChatMemberResponseDto.fromEntity(partner))
                .build();
    }
}
