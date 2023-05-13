package com.dung.ecommerce.rabbitmq;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.connection.SimpleRoutingConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.adapter.MessageListenerAdapter;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.amqp.SimpleRabbitListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
public class RabbitConfig {
    @Bean
    public Queue rateQueue() {
        return new Queue(RabbitConstants.UPDATE_REVIEWS_QUEUE, true, false, false);
    }

    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(RabbitConstants.DIRECT_EXCHANGE);
    }

    @Bean
    public Binding rateBinding() {
        return BindingBuilder.bind(rateQueue()).to(directExchange()).with(RabbitConstants.REVIEWS_ROUTING_KEY);
    }

    @Bean
    public MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public MessageListenerAdapter listenerAdapter(ConnectionFactory connectionFactory) {
        MessageListenerAdapter listenerAdapter = new MessageListenerAdapter(connectionFactory);
        listenerAdapter.setMessageConverter(messageConverter());
        return listenerAdapter;
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory factory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(factory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }
}
