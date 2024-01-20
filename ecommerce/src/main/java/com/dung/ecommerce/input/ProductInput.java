package com.dung.ecommerce.input;

import com.dung.ecommerce.enums.Category;
import lombok.Data;
import lombok.Getter;

import java.math.BigDecimal;

@Data
@Getter
public class ProductInput {
    private String name;
    private String phone;
    private String email;
    private String address;
    private Category category;
    private Double price;
    private String shortDescription;
    private String longDescription;
    private Integer quantity;
}
