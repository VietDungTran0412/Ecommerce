package com.dung.ecommerce.input.order;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import java.util.List;

@Data
@Getter
@Setter
public class OrderInput {
//    @NotNull
    private ContactInput contact;
//    @NotNull
    private PaymentInput payment;
//    @NotNull
    private List<OrderedProductInput> products;

}
