package com.dung.ecommerce.input.order;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Data
@Getter
@Setter
public class PaymentInput {
    private ContactInput paymentContact;
}
