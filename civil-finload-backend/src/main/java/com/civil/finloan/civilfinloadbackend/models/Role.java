package com.civil.finloan.civilfinloadbackend.models;

public enum Role {
	
	USER("user"),
	ADMIN("admin");
	public String name;
	
	Role(String role) {
		this.name = role;
	}
}
