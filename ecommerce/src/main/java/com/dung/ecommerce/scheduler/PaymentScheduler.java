package com.dung.ecommerce.scheduler;

import com.dung.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class PaymentScheduler {
    private final OrderService orderService;

    public void confirmOrder() {

    }
}
