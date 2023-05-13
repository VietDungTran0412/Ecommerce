package com.dung.ecommerce.repository;

import com.dung.ecommerce.document.BlackListJwt;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackListJwtRepository extends MongoRepository<BlackListJwt, String> {
    boolean existsBlackListJwtByJwt(String jwt);
}
