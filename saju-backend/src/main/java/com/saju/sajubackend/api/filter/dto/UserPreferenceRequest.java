package com.saju.sajubackend.api.filter.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;

import java.util.List;

@Getter
public class UserPreferenceRequest {

    @NotNull(message = "선호하는 흡연 상태 값은 반드시 들어와야합니다.")
    private int smokingFilter;

    @NotNull(message = "선호하는 음주 상태 값은 반드시 들어와야합니다.")
    private int drinkingFilter;

    @Size(min = 1, message = "선호하는 지역 값은 반드시 들어와야합니다.")
    private List<Integer> regionFilter;

    @Size(min = 1, message = "선호하는 종교 값은 반드시 들어와야합니다.")
    private List<Integer> religionFilter;

    @Min(value = 140, message = "키의 최소 값은 140입니다.")
    @Max(value = 220, message = "키의 최댓 값은 220입니다.")
    private int minHeight;

    @Min(value = 140, message = "키의 최소 값은 140입니다.")
    @Max(value = 220, message = "키의 최댓 값은 220입니다.")
    private int maxHeight;

    @Min(value = 20, message = "나이의 최소 값은 20입니다.")
    @Max(value = 50, message = "나이의 최댓 값은 50입니다.")
    private int minAge;

    @Min(value = 20, message = "나이의 최소 값은 20입니다.")
    @Max(value = 50, message = "나이의 최댓 값은 50입니다.")
    private int maxAge;
}
