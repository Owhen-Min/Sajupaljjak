package com.saju.sajubackend.api.chat.dto.response;

import com.saju.sajubackend.api.chat.domain.ChatMessage;
import com.saju.sajubackend.api.chat.domain.LastMessage;
import com.saju.sajubackend.api.chat.dto.request.ChattingRequestDto;
import com.saju.sajubackend.api.member.domain.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ChatroomResponseDto {

    private Long chatRoomId;

    private Long memberId;

    private ChatMemberResponseDto partner;

    private LastMessageResponseDto message;

    @Builder
    private ChatroomResponseDto(Long chatRoomId, Long memberId, ChatMemberResponseDto partner,
                               LastMessageResponseDto message) {
        this.chatRoomId = chatRoomId;
        this.memberId = memberId;
        this.partner = partner;
        this.message = message;
    }

    public static ChatroomResponseDto from(Long chatRoomId, Member member, LastMessage message,
                                           Long newMessageCount) {
        return ChatroomResponseDto.builder()
                .chatRoomId(chatRoomId)
                .partner(ChatMemberResponseDto.fromEntity(member))
                .message(LastMessageResponseDto.fromEntity(message, newMessageCount))
                .build();
    }

    public static ChatroomResponseDto from(Long chatRoomId, Member member, ChattingRequestDto message,
                                           Long newMessageCount) {
        return ChatroomResponseDto.builder()
                .chatRoomId(chatRoomId)
                .partner(ChatMemberResponseDto.fromEntity(member))
                .message(LastMessageResponseDto.fromEntity(message, newMessageCount))
                .build();
    }

    public static ChatroomResponseDto from(Long chatRoomId, Member member, ChatMessage message,
                                           Long newMessageCount) {
        return ChatroomResponseDto.builder()
                .chatRoomId(chatRoomId)
                .partner(ChatMemberResponseDto.fromEntity(member))
                .message(LastMessageResponseDto.fromEntity(message, newMessageCount))
                .build();
    }
}
