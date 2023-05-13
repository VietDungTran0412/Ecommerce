package com.dung.ecommerce.enums;

public enum Category {
    CLOTHES("CLOTHES"),
    BOOK("BOOK"),
    HOUSEHOLD("HOUSEHOLD"),
    STUDY("STUDY"),
    FOOD("FOOD"),
    DAILY("DAILY");

    private final String category;
    Category(String type) {
        this.category = type;
    }
    public String getType() {
        return this.category;
    }
}
