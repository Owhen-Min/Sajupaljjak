package com.saju.sajubackend.api.matching.dto;

import com.saju.sajubackend.api.member.domain.Member;

import java.time.LocalDate;

public record MemberListResponseDto(
        Long id,
        String nickname,
        long score,
        String profileImage,
        Integer region,
        int age,
        String celestialStem,
        String introduction
) {

    public static MemberListResponseDto fromEntity(Member member, long score) {
        return new MemberListResponseDto(
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
