package com.saju.sajubackend.api.matching.dto;

import com.saju.sajubackend.api.member.domain.Member;

import java.time.LocalDate;

public record MatchingMemberResponseDto(

        Long id,
        String nickname,
        int score,
        String profileImage,
        Long region,
        int age,
        String celestialStem,
        String introduction
) {

    public static MatchingMemberResponseDto fromEntity(Member member, int score) {
        return new MatchingMemberResponseDto(
                member.getMemberId(),
                member.getNickname(),
                score,
                member.getProfileImg(),
                member.getCityCode(),
                calculateAge(member.getBday()),
                member.getCelestialStem().getLabel(),
                member.getIntro()
        );
    }

    private static int calculateAge(LocalDate birthDate) {
        LocalDate today = LocalDate.now();
        int age = today.getYear() - birthDate.getYear();

        if (birthDate.plusYears(age).isAfter(today)) { // 생일이 아직 지나지 않았다면 나이에서 1 빼기
            age--;
        }
        return age;
    }
}
