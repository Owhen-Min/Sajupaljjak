package com.saju.sajubackend.common.exception;

import org.springframework.http.HttpStatus;

public class UnAuthorizedException extends BaseException {
	public UnAuthorizedException(ErrorMessage errorMessage) {
		super(HttpStatus.UNAUTHORIZED, errorMessage);
	}
}
