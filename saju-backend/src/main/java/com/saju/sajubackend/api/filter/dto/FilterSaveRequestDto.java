package com.saju.sajubackend.api.filter.dto;

import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.member.domain.Member;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record FilterSaveRequestDto(
        @NotNull(message = "선호하는 흡연 상태 값은 반드시 들어와야합니다.") int smokingFilter,
        @NotNull(message = "선호하는 음주 상태 값은 반드시 들어와야합니다.") int drinkingFilter,
        @Size(min = 1, message = "선호하는 지역 값은 반드시 들어와야합니다.") List<Integer> regionFilter,
        @Size(min = 1, message = "선호하는 종교 값은 반드시 들어와야합니다.") List<Integer> religionFilter,
        @Min(value = 140, message = "키의 최소 값은 140입니다.") @Max(value = 220, message = "키의 최댓 값은 220입니다.") int minHeight,
        @Min(value = 140, message = "키의 최소 값은 140입니다.") @Max(value = 220, message = "키의 최댓 값은 220입니다.") int maxHeight,
        @Min(value = 20, message = "나이의 최소 값은 20입니다.") @Max(value = 50, message = "나이의 최댓 값은 50입니다.") int minAge,
        @Min(value = 20, message = "나이의 최소 값은 20입니다.") @Max(value = 50, message = "나이의 최댓 값은 50입니다.") int maxAge
) {
    public Filter toEntity(Member member) {
        return Filter.builder()
                .member(member)
                .smokingId(smokingFilter)
                .drinkingId(drinkingFilter)
                .minHeight(minHeight)
                .maxHeight(maxHeight)
                .minAge(minAge)
                .maxAge(maxAge)
                .build();
    }
}
