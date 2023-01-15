package com.civil.finloan.civilfinloadbackend.controllers;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.civil.finloan.civilfinloadbackend.exception.UserNotFoundException;
import com.civil.finloan.civilfinloadbackend.models.Role;
import com.civil.finloan.civilfinloadbackend.models.user.User;
import com.civil.finloan.civilfinloadbackend.models.user.UserRepository;

@RestController
@RequestMapping("/api/v1")
public class MemberController {

	private final UserRepository userRepository;

	public MemberController(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	@GetMapping("/members")
	@PreAuthorize("hasAuthority('ROLE_ADMIN')")
	public ResponseEntity<List<User>> getAllMembers() {
		List<User> userExcludingAdmin = userRepository.findAll().stream()
				.filter(user -> user.getRole() != Role.ADMIN)
				.collect(Collectors.toList());
		return ResponseEntity.ok(userExcludingAdmin);
	}

	@GetMapping("/members/{id}")
	public ResponseEntity<List<User>> getUserById(@PathVariable int id) throws UserNotFoundException {
		User user = userRepository.findById(id).orElse(null);
		if (user == null) {
			throw new UserNotFoundException(String.format("id: %s", id));
		}

		return ResponseEntity.ok(List.of(user));
	}

	@PutMapping("/members/{id}")
	public void updateMember(@RequestBody User user, @PathVariable int id) {
		user.setId(id);
		userRepository.save(user);
	}

}
