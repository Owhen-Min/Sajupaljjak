package com.saju.sajubackend.common.enums;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum Element {

    FIRE(0, "화"),
    WATER(1, "수"),
    WOOD(2, "목"),
    METAL(3, "금"),
    EARTH(4, "토");

    private final int code;
    private final String label;

    public static Element fromCode(int code) {
        for (Element element : Element.values()) {
            if (element.code == code) {
                return element;
            }
        }
        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_ELEMENT_CODE);
    }

    public static Element fromLabel(String label) {
        for (Element element : Element.values()) {
            if (element.label.equals(label)) {
                return element;
            }
        }
        throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_ELEMENT_LABEL);
    }
}
