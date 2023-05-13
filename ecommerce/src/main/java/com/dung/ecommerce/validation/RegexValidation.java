package com.dung.ecommerce.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.regex.Pattern;

public class RegexValidation implements ConstraintValidator<Regex, String> {

    private boolean isRequired;
    private String pattern;

    @Override
    public void initialize(Regex constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
        this.isRequired = constraintAnnotation.isRequired();
        this.pattern = constraintAnnotation.pattern();
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if(value == null && !isRequired) return true;
        Pattern pattern = Pattern.compile(this.pattern);
        return pattern.matcher(value).matches();
    }
}
