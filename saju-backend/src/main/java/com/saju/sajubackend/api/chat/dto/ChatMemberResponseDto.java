package com.saju.sajubackend.api.chat.dto;

import com.saju.sajubackend.api.member.domain.Member;
import lombok.Builder;

public class ChatMemberResponseDto {

    private Long memberId;

    private String nickname;

    private String profileImg;

    private String celestialStem;

    @Builder
    private ChatMemberResponseDto(Long memberId, String nickname, String profileImg, String celestialStem) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.celestialStem = celestialStem;
    }

    public static ChatMemberResponseDto fromEntity(Member member) {
        return ChatMemberResponseDto.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .profileImg(member.getProfileImg())
                .celestialStem(member.getCelestialStem().getLabel())
                .build();
    }
}
