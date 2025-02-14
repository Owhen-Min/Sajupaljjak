package com.saju.sajubackend.common.advice;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.saju.sajubackend.common.exception.BaseException;
import com.saju.sajubackend.common.exception.FailResponse;

@RestControllerAdvice(annotations = {RestController.class})
public class ControllerExceptionAdvice {

	@ExceptionHandler(BaseException.class)
	public ResponseEntity<FailResponse> handleBaseException(BaseException e) {
		return ResponseEntity
			.status(e.getHttpStatus())
			.body(FailResponse.fail(e.getHttpStatus().value(), e.getErrorMessage().getMessage()));
	}

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<FailResponse> handleValidationException(Exception e) {
		return ResponseEntity
				.status(HttpStatus.BAD_REQUEST)
				.body(FailResponse.fail(HttpStatus.BAD_REQUEST.value(), e.getMessage()));
	}

}
