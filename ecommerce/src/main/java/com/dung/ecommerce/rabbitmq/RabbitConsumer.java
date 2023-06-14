package com.dung.ecommerce.rabbitmq;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.service.ProductService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.amqp.rabbit.annotation.*;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class RabbitConsumer {
    private final ProductService productService;

    @RabbitListener(queues = {RabbitConstants.UPDATE_REVIEWS_QUEUE})
    public void receiveUpdateMessage(@Payload String message) {
        try {
            log.info("{}",message.toString());
            ObjectMapper mapper = new ObjectMapper();
            JsonNode productIdInput = mapper.readTree(message).get("productId");
            JsonNode scoreInput = mapper.readTree(message).get("score");
            Float score = Float.valueOf(String.valueOf(scoreInput));

            String productId = StringUtils.strip(String.valueOf(productIdInput), String.valueOf('"'));
            Optional<Product> product = productService.findById(productId);
            if(!product.isPresent()) {
                log.error("Product is not found with id {}", productId);
                return;
            }
            
            Long numOfReviews = product.get().getRate().getNumOfRate();
            Long numberOfReviews = numOfReviews + 1;
            Float newScore = (numOfReviews * product.get().getRate().getScore() + score) / numberOfReviews;
            Product productToUpdate = product.get();
            productToUpdate.getRate().setScore(newScore);
            productToUpdate.getRate().setNumOfRate(numberOfReviews);
            productService.save(productToUpdate);
            log.info("Saving product with id: {}", product.get().getId());
        } catch (Exception e) {
            log.error("Error: {}", e.getMessage());
        }
    }
}
