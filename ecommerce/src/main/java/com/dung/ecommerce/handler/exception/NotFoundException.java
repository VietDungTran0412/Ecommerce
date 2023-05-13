package com.dung.ecommerce.handler.exception;

public class NotFoundException extends RuntimeException{
    private static final long serialVersionUID = 2709017199190266433L;
    public NotFoundException(String message) {super(message);}
}
