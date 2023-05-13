package com.dung.ecommerce.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Documented
@Target({ElementType.CONSTRUCTOR, ElementType.FIELD, ElementType.TYPE_USE, ElementType.PARAMETER})
@Constraint(validatedBy = {NameValidation.class})
public @interface Name {
    String message() default "Invalid name format!";

    boolean isRequired() default true;

    Class<?>[] groups() default {};

    // represents additional information about annotation
    Class<? extends Payload>[] payload() default {};
}
