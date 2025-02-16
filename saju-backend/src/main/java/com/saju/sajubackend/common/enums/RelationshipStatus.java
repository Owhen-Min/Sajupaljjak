package com.saju.sajubackend.common.enums;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum RelationshipStatus {

    //솔로가 false, 커플 true
    SOLO(0, "false"),
    COUPLE(1, "true");

    private final int code;
    private final String label;

    public static RelationshipStatus fromCode(int code) {
        for (RelationshipStatus status : RelationshipStatus.values()) {
            if (status.code == code) return status;
        }

        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_SOLO_STATUS_CODE);
    }

    public static RelationshipStatus fromLabel(String label) {
        if (label == null || label.isBlank()) {
            return null;
        }
        for (RelationshipStatus status : RelationshipStatus.values()) {
            if (status.label.equals(label)) return status;

            if ("solo".equals(label.toLowerCase())) return status;
        }

        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_SOLO_STATUS_LABEL);
    }
}
