package com.saju.sajubackend.common.enums;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum Gender {
    MALE(1, "남성"),
    FEMALE(2, "여성");

    private final int code;
    private final String label;

    public static Gender fromCode(int code) {
        for (Gender gender : Gender.values()) {
            if (gender.code == code) {
                return gender;
            }
        }
        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_GENDER_CODE);
    }

    public static Gender fromLabel(String label) {
        for (Gender gender : Gender.values()) {
            if (gender.label.equals(label)) {
                return gender;
            }
        }
        throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_GENDER_LABEL);
    }
}
