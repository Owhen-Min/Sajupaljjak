package com.saju.sajubackend.common.exception;

import org.springframework.http.HttpStatus;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class BaseException extends RuntimeException {
	HttpStatus httpStatus;
	ErrorMessage errorMessage;

	public BaseException(HttpStatus httpStatus, ErrorMessage errorMessage) {
		this.httpStatus = httpStatus;
		this.errorMessage = errorMessage;
	}
}
