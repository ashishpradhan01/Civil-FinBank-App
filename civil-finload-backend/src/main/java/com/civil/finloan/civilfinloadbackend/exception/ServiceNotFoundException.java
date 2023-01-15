package com.civil.finloan.civilfinloadbackend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND)
public class ServiceNotFoundException extends Exception {
	public ServiceNotFoundException(String message) {
		super(message);
	}
}