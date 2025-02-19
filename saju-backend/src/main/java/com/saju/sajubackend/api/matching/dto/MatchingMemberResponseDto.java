package com.saju.sajubackend.api.matching.dto;

import com.saju.sajubackend.api.member.domain.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public  class MatchingMemberResponseDto implements Serializable {

    private Long id;
    private String nickname;
    private int score;
    private String profileImage;
    private String region;
    private int age;
    private String celestialStem;
    private String introduction;

    public static MatchingMemberResponseDto fromEntity(Member member, int score) {
        return new MatchingMemberResponseDto(
                member.getMemberId(),
                member.getNickname(),
                score,
                member.getProfileImg(),
                member.getCityCode().toString(),
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
