package com.saju.sajubackend.common.enums;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum MessageType {

    TEXT(0, "일반 채팅"),
    VIDEO_REQUEST(1, "화상 신청"),
    MATCH_REQUEST(2, "매칭 신청");

    private final int code;
    private final String label;

    public static MessageType fromCode(int code) {
        for (MessageType type : MessageType.values()) {
            if (type.code == code) {
                return type;
            }
        }
        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_MESSAGE_CODE);
    }

    public static MessageType fromLabel(String label) {
        for (MessageType type : MessageType.values()) {
            if (type.label.equals(label)) {
                return type;
            }
        }
        throw new BaseException(HttpStatus.BAD_REQUEST, ErrorMessage.INVALID_MESSAGE_LABEL);
    }
}
