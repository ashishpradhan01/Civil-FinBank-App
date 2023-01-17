package com.civil.finloan.civilfinloadbackend.auth;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.civil.finloan.civilfinloadbackend.config.JwtService;
import com.civil.finloan.civilfinloadbackend.exception.UserNotFoundException;
import com.civil.finloan.civilfinloadbackend.models.Role;
import com.civil.finloan.civilfinloadbackend.models.user.User;
import com.civil.finloan.civilfinloadbackend.models.user.UserRepository;

@Service
public class AuthenticationService {

	private final UserRepository userReposisRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	private final Logger logger = LoggerFactory.getLogger(getClass());

	public AuthenticationService(UserRepository userReposisRepository, PasswordEncoder passwordEncoder,
			JwtService jwtService, AuthenticationManager authenticationManager) {
		super();
		this.userReposisRepository = userReposisRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
		this.authenticationManager = authenticationManager;
	}

	public AuthenticationResponse register(RegisterRequest request) {
		User user = new User(request.fullName(), request.mobile(), request.email(),
				passwordEncoder.encode(request.password()), Role.USER);
//		if (request.fullName().equalsIgnoreCase("admin") || request.email().equalsIgnoreCase("admin")) {
//			user.setRole(Role.ADMIN);
//		}

		logger.info(user.toString());
		userReposisRepository.save(user);
		var jwtToken = jwtService.generateToken(user);
		var authResponse = new AuthenticationResponse(jwtToken, user);
		return authResponse;
	}
	
	public AuthenticationResponse update(User updateUser) {
		User user = userReposisRepository.findById(updateUser.getId()).orElse(null);
		user.setFullName(updateUser.getFullName());
		user.setMobile(updateUser.getMobile());
		userReposisRepository.save(user);
		var jwtToken = jwtService.generateToken(user);
		var authResponse = new AuthenticationResponse(jwtToken, user);
		return authResponse;
	}

	// Login
	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));
		var user = userReposisRepository.findByEmail(request.email()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		var authResponse = new AuthenticationResponse(jwtToken, user);
		return authResponse;
	}

}
