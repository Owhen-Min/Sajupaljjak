package com.saju.sajubackend.api.chat.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ChatroomResponseDto {

    private Long chatRoomId;

    private ChatMemberResponseDto partner;

    private LastMessageResponseDto message;

    @Builder
    private ChatroomResponseDto(Long chatRoomId, ChatMemberResponseDto partner, LastMessageResponseDto message) {
        this.chatRoomId = chatRoomId;
        this.partner = partner;
        this.message = message;
    }
}
