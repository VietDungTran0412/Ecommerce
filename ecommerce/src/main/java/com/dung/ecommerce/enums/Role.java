package com.dung.ecommerce.enums;

public enum Role {
    USER("USER");
    private String role;
    Role(String role) {
        this.role = role;
    }
    public String getRole() {
        return role;
    }
}
