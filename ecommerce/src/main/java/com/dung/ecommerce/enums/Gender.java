package com.dung.ecommerce.enums;

public enum Gender {
    MALE("MALE"),
    FEMALE("FEMALE"),
    OTHER("OTHER");

    private String code;
    Gender(String code) {
        this.code = code;
    }
    public String getCode() {
        return this.code;
    }
}
