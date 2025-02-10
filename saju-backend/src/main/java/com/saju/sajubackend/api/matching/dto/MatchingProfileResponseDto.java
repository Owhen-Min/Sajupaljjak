package com.saju.sajubackend.api.matching.dto;

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
}
