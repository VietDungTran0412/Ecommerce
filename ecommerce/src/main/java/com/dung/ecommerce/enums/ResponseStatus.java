package com.dung.ecommerce.enums;

public enum ResponseStatus {
    SUCCESS("SUCCESS"),
    ERROR("ERROR"),
    BADREQUEST("BADREQUEST");
    private final String status;
    ResponseStatus(String status) {
        this.status = status;
    }
    public String getStatus() {
        return this.status;
    }
}
