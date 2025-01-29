package com.saju.sajubackend.common.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorMessage {
	ERR_UNAUTORIZED("[ERR] Unauthorized");

	private final String message;
}
