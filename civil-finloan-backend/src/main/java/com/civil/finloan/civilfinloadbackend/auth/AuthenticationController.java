package com.civil.finloan.civilfinloadbackend.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.civil.finloan.civilfinloadbackend.models.user.User;
import com.civil.finloan.civilfinloadbackend.models.user.UserRepository;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthenticationController {
	
	private final AuthenticationService authService;
	private final UserRepository userRepository;
	private final Logger logger = LoggerFactory.getLogger(getClass());
	public AuthenticationController(AuthenticationService authService, UserRepository userRepository) {
		super();
		this.authService = authService;
		this.userRepository = userRepository;
	}
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(authService.register(request));
	}
	
	@PutMapping("/update")
	public ResponseEntity<AuthenticationResponse> update(@RequestBody User user) {
		return ResponseEntity.ok(authService.update(user));
	}
	
	//Login
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		return ResponseEntity.ok(authService.authenticate(request));
	}
}

@Repository
interface UserRespository extends JpaRepository<User, Integer> {
	
}