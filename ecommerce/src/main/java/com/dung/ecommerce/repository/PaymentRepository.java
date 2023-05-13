package com.dung.ecommerce.repository;

import com.dung.ecommerce.document.Payment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoRepositories
public interface PaymentRepository extends MongoRepository<Payment, String> {
}
