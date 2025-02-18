package com.saju.sajubackend.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {
    // auth
    ERR_UNAUTORIZED("[ERR] Unauthorized"),
    MEMBER_NOT_FOUND("존재하지 않는 사용자입니다."),
    REFRESH_TOKEN_EXPIRED("만료된 토큰입니다."),
    DUPLICATE_NICKNAME("이미 존재하는 닉네임입니다."),
    INVALID_REFRESH_TOKEN("유효하지 않은 토큰입니다."),

    FILTER_NOT_FOUND("존재하지 않는 필더입니다."),

    // ENUM 관련 오류
    INVALID_GENDER_CODE("유효하지 않은 성별 코드입니다."),
    INVALID_GENDER_LABEL("유효하지 않은 성별 값입니다."),

    INVALID_DRINKING_CODE("유효하지 않은 음주 코드입니다."),
    INVALID_DRINKING_LABEL("유효하지 않은 음주 값입니다."),

    INVALID_SMOKING_CODE("유효하지 않은 흡연 코드입니다."),
    INVALID_SMOKING_LABEL("유효하지 않은 흡연 값입니다."),

    INVALID_RELIGION_CODE("유효하지 않은 종교 코드입니다."),
    INVALID_RELIGION_LABEL("유효하지 않은 종교 값입니다."),

    INVALID_MESSAGE_CODE("유효하지 않은 메시지 코드입니다."),
    INVALID_MESSAGE_LABEL("유효하지 않은 메시지 값입니다."),

    INVALID_ELEMENT_CODE("유효하지 않은 오행 코드입니다."),
    INVALID_ELEMENT_LABEL("유효하지 않은 오행 값입니다."),

    INVALID_CELESTIAL_STEM_CODE("유효하지 않은 천간 코드입니다."),
    INVALID_CELESTIAL_STEM_LABEL("유효하지 않은 천간 값입니다."),

    INVALID_SOLO_STATUS_CODE("유효하지 않은 솔로 상태 코드입니다."),
    INVALID_SOLO_STATUS_LABEL("유효하지 않은 솔로 상태 값입니다."),

    // couple
    COUPLE_NOT_FOUND("존재하지 않는 커플입니다."),
    INVITE_CODE_NOT_FOUND("유효하지 않은 초대 코드입니다"),
    INVALID_GENDER_COMBINATION("유효하지 않은 성별 조합입니다"),

    // chat
    INVALID_CHAT_ROOM("유효하지 않은 채팅방입니다.");

    private final String message;
}
