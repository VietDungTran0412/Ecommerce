package com.dung.ecommerce.resolver;

import com.dung.ecommerce.input.order.OrderInput;
import com.dung.ecommerce.mapper.OrderMapper;
import com.dung.ecommerce.rabbitmq.RabbitConstants;
import com.dung.ecommerce.rabbitmq.RabbitProducer;
import com.dung.ecommerce.response.OrderResponse;
import com.dung.ecommerce.service.OrderService;
import com.netflix.graphql.dgs.DgsComponent;
import com.netflix.graphql.dgs.DgsMutation;
import com.netflix.graphql.dgs.InputArgument;
import com.stripe.exception.StripeException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@DgsComponent
@Slf4j
@AllArgsConstructor
public class PaymentResolver {

    private final OrderService orderService;
    private final RabbitProducer producer;
    private final HttpServletRequest request;

//    @DgsQuery
//    public String getStatus() throws StripeException {
//        Stripe.apiKey = apiKey;
//        PaymentIntent intent = PaymentIntent.retrieve("cs_test_a1hdCzy2GXfHXMtMpnrgefKpwSf6JSWfgW5UV7Oj05PY0tXmdlANZPonRI");
//        return intent.getStatus();
//    }

    @DgsMutation
    public OrderResponse makeOrder(@InputArgument @Valid OrderInput order,@InputArgument String userId) throws StripeException {
        log.info("Starting creating an order request to ecommerce");
        return orderService.makeOrder(order, userId,OrderMapper.INSTANCE::toOrder);
    }
}
