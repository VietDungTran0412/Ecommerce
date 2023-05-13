package com.dung.ecommerce.rabbitmq;

import com.dung.ecommerce.input.UpdateRateInput;
import com.dung.ecommerce.response.OrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class RabbitProducer {
    private final RabbitTemplate rabbitTemplate;

    public void send(String topicExchange, String routingKey, String message) {
        rabbitTemplate.convertAndSend(topicExchange,routingKey,message);
    }

    public void send(String routingKey, String message) {
        rabbitTemplate.convertAndSend(routingKey,message);
    }
}
