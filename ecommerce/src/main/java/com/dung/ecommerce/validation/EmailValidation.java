package com.dung.ecommerce.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.annotation.Annotation;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class EmailValidation implements ConstraintValidator<Email, String> {
    private boolean isRequired;

    @Override
    public void initialize(Email email) {
        ConstraintValidator.super.initialize(email);
        this.isRequired = email.isRequired();
    }

    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
        Pattern patternDate = Pattern.compile(regexPattern);
        Matcher matcher = patternDate.matcher(email);
        return matcher.matches();
    }
}
