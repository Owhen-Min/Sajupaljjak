package com.saju.sajubackend.api.couple.dto;

import com.saju.sajubackend.api.couple.domain.Couple;
import com.saju.sajubackend.api.member.domain.Member;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record CoupleResponseDto(
        Long coupleId,
        MemberInfoDto member,
        MemberInfoDto partner,
        LocalDateTime startDate
) {
    public static CoupleResponseDto fromEntity(Couple couple) {
        Member male = couple.getCoupleMale();
        Member female = couple.getCoupleFemale();

        return new CoupleResponseDto(
                couple.getCoupleId(),
                MemberInfoDto.fromEntity(male),
                MemberInfoDto.fromEntity(female),
                couple.getStartDate()
        );
    }

    public record MemberInfoDto(
            Long memberId,
            String nickname,
            String profileImage,
            Integer region,
            int age,
            String celestialStem
    ) {
        public static MemberInfoDto fromEntity(Member member) {
            return new MemberInfoDto(
                    member.getMemberId(),
                    member.getNickname(),
                    member.getProfileImg(),
                    member.getCityCode(),
                    calculateAge(member.getBday()),
                    member.getCelestialStem().getLabel()
            );
        }

        private static int calculateAge(LocalDate birthDate) {
            int currentYear = LocalDate.now().getYear();
            int age = currentYear - birthDate.getYear();

            return (LocalDate.now().isBefore(birthDate.plusYears(age))) ? age - 1 : age;
        }
    }
}
