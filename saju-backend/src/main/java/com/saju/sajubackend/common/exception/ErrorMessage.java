package com.saju.sajubackend.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {
	// auth
	ERR_UNAUTORIZED("[ERR] Unauthorized"),
	MEMBER_NOT_FOUND("존재하지 않는 사용자입니다."),

	// ENUM 관련 오류
	INVALID_GENDER_CODE("유효하지 않은 성별 코드입니다."),
	INVALID_GENDER_LABEL("유효하지 않은 성별 값입니다."),

	INVALID_DRINKING_CODE("유효하지 않은 음주 코드입니다."),
	INVALID_DRINKING_LABEL("유효하지 않은 음주 값입니다."),

	INVALID_SMOKING_CODE("유효하지 않은 흡연 코드입니다."),
	INVALID_SMOKING_LABEL("유효하지 않은 흡연 값입니다."),

	INVALID_RELIGION_CODE("유효하지 않은 종교 코드입니다."),
	INVALID_RELIGION_LABEL("유효하지 않은 종교 값입니다.");

	private final String message;
}
