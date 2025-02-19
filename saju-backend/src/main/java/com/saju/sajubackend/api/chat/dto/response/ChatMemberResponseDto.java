package com.saju.sajubackend.api.chat.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.saju.sajubackend.api.member.domain.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ChatMemberResponseDto {

    private Long memberId;

    private String nickname;

    @JsonProperty("profileImage")
    private String profileImg;

    private String celestialStem;

    private int age;

    @Builder
    private ChatMemberResponseDto(Long memberId, String nickname, String profileImg, String celestialStem, int age) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImg = profileImg;
        this.celestialStem = celestialStem;
        this.age = age;
    }

    public static ChatMemberResponseDto fromEntity(Member member) {
        return ChatMemberResponseDto.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .profileImg(member.getProfileImg())
                .celestialStem(member.getCelestialStem().getLabel())
                .age(member.getAge())
                .build();
    }
}
