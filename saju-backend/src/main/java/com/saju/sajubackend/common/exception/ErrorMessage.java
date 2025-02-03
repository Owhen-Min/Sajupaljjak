package com.saju.sajubackend.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {
	ERR_UNAUTORIZED("[ERR] Unauthorized"),
	MEMBER_NOT_FOUND("존재하지 않는 사용자입니다.");

	private final String message;
}
