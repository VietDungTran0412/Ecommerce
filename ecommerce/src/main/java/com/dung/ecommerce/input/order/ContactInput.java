package com.dung.ecommerce.input.order;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class ContactInput {
    private String firstname;
    private String lastname;
    private String address1;
    private String address2;
    private String state;
    private String city;
    private String zipCode;
    private String phone;
    private String email;

}
