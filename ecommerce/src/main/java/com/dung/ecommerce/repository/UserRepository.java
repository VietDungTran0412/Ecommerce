package com.dung.ecommerce.repository;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

//@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findUserByEmail(String email);
    User findUserByProductsContains(Product product);
}
