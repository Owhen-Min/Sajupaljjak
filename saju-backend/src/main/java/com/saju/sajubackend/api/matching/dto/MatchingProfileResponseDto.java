package com.saju.sajubackend.api.matching.dto;

import com.saju.sajubackend.api.couple.domain.CoupleYear;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.saju.domain.Saju;

public record MatchingProfileResponseDto(

        long id,
        String nickname,
        int score,
        String profileImage,
        int cityCode,
        int age,
        String celestialStem,
        String introduction,
        String year,
        String month,
        String day,
        String time,
        String harmony,
        String chemi,
        String good,
        String bad,
        String advice
) {

    public static MatchingProfileResponseDto fromEntity(Member matchingMember, Integer score, Saju saju, CoupleYear coupleYear) {
        return null;
    }

    private static String formatContent(CoupleYear coupleYear) {
        return String.format(
                "두 사람의 궁합: %s\n케미: %s\n장점: %s\n단점: %s\n조언: %s",
                coupleYear.getHarmony(),
                coupleYear.getChemi(),
                coupleYear.getGood(),
                coupleYear.getBad(),
                coupleYear.getAdvice()
        );
    }
}
