package com.saju.sajubackend.common.enums;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.ErrorMessage;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum RelationshipStatus {

    SOLO(0, "솔로"),
    COUPLE(1, "커플");

    private final int code;
    private final String label;

    public static RelationshipStatus fromCode(int code) {
        for (RelationshipStatus status : RelationshipStatus.values()) {
            if (status.code == code) return status;
        }

        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_SOLO_STATUS_CODE);
    }

    public static RelationshipStatus fromLabel(String label) {
        for (RelationshipStatus status : RelationshipStatus.values()) {
            if (status.label.equals(label)) return status;

            if ("solo".equals(label.toLowerCase())) return status;
        }

        throw new BaseException(HttpStatus.UNPROCESSABLE_ENTITY, ErrorMessage.INVALID_SOLO_STATUS_LABEL);
    }
}
