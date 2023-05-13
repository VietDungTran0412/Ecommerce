package com.dung.ecommerce.input;

import com.dung.ecommerce.enums.Gender;
import com.dung.ecommerce.validation.Email;
import com.dung.ecommerce.validation.Name;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class SaveUserInput {
    @Name(isRequired = true)
    private String firstname;
    @Name(isRequired = true)
    private String lastname;
    private String dateOfBirth;
    @Email(isRequired = true)
    private String email;
    private Gender gender;
    private String password;
}
