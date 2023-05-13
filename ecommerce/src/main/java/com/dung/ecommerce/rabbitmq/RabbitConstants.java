package com.dung.ecommerce.rabbitmq;

public interface RabbitConstants {
    String TRANSACTION_ROUTING_KEY = "ecommerce.transaction.id";
    String REVIEWS_ROUTING_KEY = "ecommerce.reviews.routing-key";
    String UPDATE_REVIEWS_QUEUE = "ecommerce.reviews";
    String DIRECT_EXCHANGE = "ecommerce.direct-exchange";
}
