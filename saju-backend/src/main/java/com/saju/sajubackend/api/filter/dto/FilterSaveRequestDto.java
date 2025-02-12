package com.saju.sajubackend.api.filter.dto;

import com.saju.sajubackend.api.filter.domain.Filter;
import com.saju.sajubackend.api.filter.domain.ReligionFilter;
import com.saju.sajubackend.api.member.domain.Member;
import com.saju.sajubackend.common.enums.DrinkingFrequency;
import com.saju.sajubackend.common.enums.Religion;
import com.saju.sajubackend.common.enums.SmokingStatus;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;
import java.util.stream.Collectors;

public record FilterSaveRequestDto(
        @NotNull(message = "선호하는 흡연 상태 값은 반드시 들어와야합니다.") String smoking,
        @NotNull(message = "선호하는 음주 상태 값은 반드시 들어와야합니다.") String drinking,
        @Size(min = 1, message = "선호하는 지역 값은 반드시 들어와야합니다.") List<Long> regionFilter,
        @Size(min = 1, message = "선호하는 종교 값은 반드시 들어와야합니다.") List<String> religionFilter,
        @Min(value = 140, message = "키의 최소 값은 140입니다.") @Max(value = 220, message = "키의 최댓 값은 220입니다.") int minHeight,
        @Min(value = 140, message = "키의 최소 값은 140입니다.") @Max(value = 220, message = "키의 최댓 값은 220입니다.") int maxHeight,
        @Min(value = 20, message = "나이의 최소 값은 20입니다.") @Max(value = 50, message = "나이의 최댓 값은 50입니다.") int minAge,
        @Min(value = 20, message = "나이의 최소 값은 20입니다.") @Max(value = 50, message = "나이의 최댓 값은 50입니다.") int maxAge
) {

    public Filter toFilter(Member member) {
        return Filter.builder()
                .member(member)
                .smoking(SmokingStatus.fromLabel(smoking))
                .drinking(DrinkingFrequency.fromLabel(drinking))
                .minHeight(minHeight)
                .maxHeight(maxHeight)
                .minAge(minAge)
                .maxAge(maxAge)
                .build();
    }

    public List<ReligionFilter> toReligionFilters(Filter filter) {
        return religionFilter.stream()
                .map(religionLabel -> ReligionFilter.builder()
                        .filter(filter)
                        .religion(Religion.fromLabel(religionLabel))
                        .build())
                .collect(Collectors.toList());
    }
}
