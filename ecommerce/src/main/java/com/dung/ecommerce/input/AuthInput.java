package com.dung.ecommerce.input;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AuthInput {
    private String email;
    private String password;
}
