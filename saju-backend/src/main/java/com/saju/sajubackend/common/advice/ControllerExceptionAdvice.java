package com.saju.sajubackend.common.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.FailResponse;

@RestControllerAdvice
public class ControllerExceptionAdvice {

	@ExceptionHandler(BaseException.class)
	public ResponseEntity<FailResponse> handleBaseException(BaseException e) {
		return ResponseEntity
			.status(e.getHttpStatus())
			.body(FailResponse.fail(e.getHttpStatus().value(), e.getErrorMessage().getMessage()));
	}
}
