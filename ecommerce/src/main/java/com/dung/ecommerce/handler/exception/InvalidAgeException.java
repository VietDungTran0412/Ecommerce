package com.dung.ecommerce.handler.exception;

public class InvalidAgeException extends RuntimeException{
    private static final long serialVersionUID = 2709017199190266433L;
    public InvalidAgeException(String message) {super(message);}
}
