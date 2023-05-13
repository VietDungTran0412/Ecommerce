package com.dung.ecommerce.enums;

public enum ProductStatus {
    NEWARRIVALS("NEWARRIVALS"),
    BESTSELLER("BESTSELLER"),
    TOPRATED("TOPRATED");
    private String status;
    ProductStatus(String status) {
        this.status = status;
    }
    public String getStatus() {
        return status;
    }
}
