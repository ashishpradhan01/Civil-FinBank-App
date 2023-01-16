package com.civil.finloan.civilfinloadbackend.auth;

import com.civil.finloan.civilfinloadbackend.models.user.User;

public record AuthenticationResponse(String token, User user) {
	public AuthenticationResponse(String token, User user) {
		this.token = token;
		this.user = user;
	}
}
