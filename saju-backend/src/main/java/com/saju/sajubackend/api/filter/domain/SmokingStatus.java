package com.saju.sajubackend.api.filter.domain;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum SmokingStatus {

    NON_SMOKER(0, "비흡연"),
    SMOKER(1, "흡연"),
    QUITTING_SMOKING(2, "금연 중");

    private final int code;
    private final String label;

    public static SmokingStatus fromCode(int code) {
        for (SmokingStatus status : SmokingStatus.values()) {
            if (status.code == code) {
                return status;
            }
        }
        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_SMOKING_CODE);
    }

    public static SmokingStatus fromLabel(String label) {
        for (SmokingStatus status : SmokingStatus.values()) {
            if (status.label.equals(label)) {
                return status;
            }
        }
        throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_SMOKING_LABEL);
    }
}

