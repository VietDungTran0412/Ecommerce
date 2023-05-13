package com.dung.ecommerce.handler.exception;


public class PaymentException extends RuntimeException{
    private static final long serialVersionUID = 2709017199190266433L;
    public PaymentException(String message) {
        super(message);
    }
}
