package com.saju.sajubackend.api.chat.dto.response;

import com.saju.sajubackend.api.member.domain.Member;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class ChatHistoryResponseDto {

    private ChatMemberResponseDto partner;

    private List<ChatMessageResponseDto> messages;

    @Builder
    private ChatHistoryResponseDto(Member partner, List<ChatMessageResponseDto> messages) {
        this.partner = ChatMemberResponseDto.fromEntity(partner);
        this.messages = messages;
    }
}
