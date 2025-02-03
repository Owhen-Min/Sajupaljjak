package com.saju.sajubackend.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {
	// auth
	ERR_UNAUTORIZED("[ERR] Unauthorized"),
	MEMBER_NOT_FOUND("존재하지 않는 사용자입니다."),

	// GENDER ENUM 관련 오류
	INVALID_GENDER_CODE("유효하지 않은 성별 코드입니다."),
	INVALID_GENDER_LABEL("유효하지 않은 성별 값입니다.");


	private final String message;
}
