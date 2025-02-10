package com.saju.sajubackend.api.matching.dto;

import com.saju.sajubackend.api.couple.domain.CoupleYear;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.api.saju.domain.Saju;

import java.util.List;

public record MatchingMemberDetialResponseDto(

        MatchingMemberResponseDto matchingMemberResponseDto,
        List<String> saju,
        String content
) {

    public static MatchingMemberDetialResponseDto fromEntity(Member matchingMember, Integer score, Saju saju, CoupleYear coupleYear) {
        return new MatchingMemberDetialResponseDto(
                MatchingMemberResponseDto.fromEntity(matchingMember, score),
                List.of(saju.getTimely(), saju.getDaily(), saju.getMonthly(), saju.getYearly()),
                formatContent(coupleYear)
        );
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
