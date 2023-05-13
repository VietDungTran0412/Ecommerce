package com.dung.ecommerce.service;

import com.dung.ecommerce.document.Payment;
import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.input.ProductInput;
import com.dung.ecommerce.input.order.OrderedProductInput;
import com.dung.ecommerce.repository.PaymentRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Price;
import com.stripe.model.checkout.Session;
import com.stripe.param.PriceCreateParams;
import com.stripe.param.ProductCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Currency;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PaymentService extends BaseService<String, Payment, PaymentRepository> {

    @Value("${client.domain.host}")
    private String clientDomain;

    private final static Double FLOAT_TO_LONG = 100D;

    private final static String CURRENCY = "aud";

    protected PaymentService(PaymentRepository repository) {
        super(repository);
    }

    public Price createPrice(Product product) throws StripeException {
        ProductCreateParams productCreateParams = ProductCreateParams.builder()
                .setName(product.getName())
                .setDescription(product.getShortDescription())
                .setActive(true)
                .setType(ProductCreateParams.Type.GOOD)
                .setUrl(clientDomain + "/" + product.getId())
                .setShippable(true).build();

        com.stripe.model.Product orderedProduct = com.stripe.model.Product.create(productCreateParams);

        Long convertedPrice = (long) (FLOAT_TO_LONG * product.getPrice());

        PriceCreateParams priceCreateParams = PriceCreateParams.builder()
                .setProduct(orderedProduct.getId())
                .setUnitAmount(convertedPrice)
                .setCurrency(CURRENCY)
                .build();

        return Price.create(priceCreateParams);
    }

    public Session createCheckout(Map<Price, OrderedProductInput> orders) throws StripeException {
        SessionCreateParams sessionCreateParams = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl(clientDomain + "/checkout/success")
                .setCancelUrl(clientDomain + "/checkout/cancel")
                .setExpiresAt(new Date(System.currentTimeMillis() + 1000 * 60 * 30).getTime() / 1000)
                .addAllLineItem(
                        orders.keySet().stream()
                                .map(price -> SessionCreateParams.LineItem
                                        .builder()
                                        .setQuantity(Long.valueOf(orders.get(price).getQuantity()))
                                        .setPrice(price.getId())
                                        .build())
                                .collect(Collectors.toList())
                ).build();
        return Session.create(sessionCreateParams);
    }
}
