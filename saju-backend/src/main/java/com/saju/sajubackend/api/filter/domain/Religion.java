package com.saju.sajubackend.api.filter.domain;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum Religion {

    NONE(0, "무교"),
    CHRISTIANITY(1, "기독교"),
    BUDDHISM(2, "불교"),
    CATHOLICISM(3, "천주교"),
    OTHER(4, "기타");

    private final int code;
    private final String label;

    public static Religion fromCode(int code) {
        for (Religion religion : Religion.values()) {
            if (religion.code == code) {
                return religion;
            }
        }
        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_RELIGION_CODE);
    }

    public static Religion fromLabel(String label) {
        for (Religion religion : Religion.values()) {
            if (religion.label.equals(label)) {
                return religion;
            }
        }
        throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_RELIGION_LABEL);
    }
}

