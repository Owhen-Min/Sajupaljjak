package com.saju.sajubackend.api.filter.domain;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum DrinkingFrequency {

    NO_DRINKING(0, "음주 안함"),
    ONCE_TWICE_PER_WEEK(1, "주 1~2회"),
    THREE_FOUR_TIMES_PER_WEEK(2, "주 3~4회"),
    FIVE_TIMES_PER_WEEK(3, "주 5회 이상");

    private final int code;
    private final String label;

    public static DrinkingFrequency fromCode(int code) {
        for (DrinkingFrequency frequency : DrinkingFrequency.values()) {
            if (frequency.code == code) {
                return frequency;
            }
        }
        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_DRINKING_CODE);
    }

    public static DrinkingFrequency fromLabel(String label) {
        for (DrinkingFrequency frequency : DrinkingFrequency.values()) {
            if (frequency.label.equals(label)) {
                return frequency;
            }
        }
        throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_DRINKING_LABEL);
    }
}

