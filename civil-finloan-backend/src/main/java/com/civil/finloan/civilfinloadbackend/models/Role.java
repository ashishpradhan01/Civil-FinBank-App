package com.civil.finloan.civilfinloadbackend.models;

public enum Role {
	
	USER("USER"),
	ADMIN("ADMIN");
	public String name;
	
	Role(String role) {
		this.name = role;
	}
}
