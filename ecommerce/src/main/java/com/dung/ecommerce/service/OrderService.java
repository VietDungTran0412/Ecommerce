package com.dung.ecommerce.service;

import com.dung.ecommerce.document.Order;
import com.dung.ecommerce.document.Payment;
import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.document.User;
import com.dung.ecommerce.enums.OrderStatus;
import com.dung.ecommerce.handler.exception.InvalidIdException;
import com.dung.ecommerce.handler.exception.PaymentException;
import com.dung.ecommerce.input.order.OrderInput;
import com.dung.ecommerce.input.order.OrderedProductInput;
import com.dung.ecommerce.repository.OrderRepository;
import com.dung.ecommerce.response.OrderResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.checkout.Session;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.function.Function;

@Service
@Slf4j
public class OrderService extends BaseService<String, Order, OrderRepository> {

    @Value("${stripe.secret.apikey}")
    private String apikey;
    private final ProductService productService;
    private final JwtService jwtService;
    private final PaymentService paymentService;
    private final UserService userService;

    protected OrderService(OrderRepository repository, ProductService productService, JwtService jwtService, PaymentService paymentService, UserService userService) {
        super(repository);
        this.productService = productService;
        this.jwtService = jwtService;
        this.paymentService = paymentService;
        this.userService = userService;
    }

    @Transactional(rollbackFor = Exception.class)
    public OrderResponse makeOrder(OrderInput orderInput, String userId, Function<OrderInput, Order> mapper) throws StripeException {

        final Optional<User> internalUser = userService.findById(userId);

        Order order = mapper.apply(orderInput);
        if(internalUser.isPresent()) {
            order.setUser(internalUser.get());
        }
        log.info("Started confirmed orders from ecommerce");
        List<Product> products = new ArrayList<>();
        Stripe.apiKey = apikey;
        Map<Price, OrderedProductInput> prices = new HashMap<>();
        for(OrderedProductInput productInput : orderInput.getProducts()) {
            Optional<Product> product = productService.findById(productInput.getId());
            if(!product.isPresent()) {
                throw new InvalidIdException("Invalid product's id found!");
            }
            products.add(product.get());
            Price price = paymentService.createPrice(product.get());
            prices.put(price, productInput);
        }
        order.setOrderedProducts(products);
        order.setStatus(OrderStatus.PENDING);
        order.setDateJoined(new Date());

        Random random = new Random();
        order.setShippingDate(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * (int) random.nextFloat() * 10));
        try {
            Session checkout = paymentService.createCheckout(prices);
            log.info("Created transaction session to pay for the order!");
            order.getPayment().setValue(Double.valueOf(checkout.getAmountSubtotal()));
            Payment payment = paymentService.save(order.getPayment());
            order.setPayment(payment);
            Order savedOrder = this.save(order);
            return OrderResponse.builder()
                    .successUrl(checkout.getSuccessUrl())
                    .cancelUrl(checkout.getCancelUrl())
                    .paymentUrl(checkout.getUrl())
                    .order(savedOrder)
                    .subTotal( String.valueOf (checkout.getAmountSubtotal() / 100))
                    .build();
        }catch (StripeException e) {
            log.error("Error with creating session to pay for the order: {}", e.getMessage() );
            throw new PaymentException("Unexpected error during transaction: " + e.getMessage());
        }
    }
}
