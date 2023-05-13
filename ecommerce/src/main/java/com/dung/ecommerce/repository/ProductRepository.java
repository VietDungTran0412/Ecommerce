package com.dung.ecommerce.repository;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.enums.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ProductRepository extends MongoRepository<Product, String>{
    List<Product> findProductByCategory(Category category);
    Set<Product> findAllByIdIn(Set<String> ids);
    Page<Product> findByNameStartsWith(String name, Pageable pageable);
    Page<Product> findByNameStartsWithAndPriceBetween(String name, Double priceFrom, Double priceTo, Pageable pageable);
}
