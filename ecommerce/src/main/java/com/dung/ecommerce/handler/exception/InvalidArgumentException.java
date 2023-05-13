package com.dung.ecommerce.handler.exception;

public class InvalidArgumentException extends RuntimeException{
    private static final long serialVersionUID = 2709017199190266433L;
    public InvalidArgumentException(String message) {super(message);}
}
