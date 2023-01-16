package com.civil.finloan.civilfinloadbackend.auth;

public record RegisterRequest
(
		String fullName,
		String email,
		long mobile,
		String password
) {}
