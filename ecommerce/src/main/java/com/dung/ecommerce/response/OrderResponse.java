package com.dung.ecommerce.response;

import com.dung.ecommerce.document.Order;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Builder
public class OrderResponse {
    private Order order;
    private String paymentUrl;
    private String cancelUrl;
    private String successUrl;
    private String subTotal;
}
