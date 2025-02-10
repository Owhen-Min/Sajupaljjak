package com.saju.sajubackend.api.saju.dto;

public record SajuDetailResponse(
        int totalScore,
        int wealthScore,
        int healthScore,
        int loveScore,
        int studyScore,
        SajuContent content
) {}
