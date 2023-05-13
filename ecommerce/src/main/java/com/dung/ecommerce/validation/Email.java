package com.dung.ecommerce.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Documented
@Target({ElementType.CONSTRUCTOR, ElementType.FIELD, ElementType.TYPE_USE, ElementType.PARAMETER})
@Constraint(validatedBy = {EmailValidation.class})
public @interface Email {
    String message() default "Invalid email format!";

    boolean isRequired() default true;

    Class<?>[] groups() default {};

    // represents additional information about annotation
    Class<? extends Payload>[] payload() default {};
}
