package com.saju.sajubackend.api.couple.dto;

import java.util.List;

public record CoupleDateListResponseDto(
        List<String> goodDates,
        List<String> badDates
) {
}
