package com.dung.ecommerce.service;

import com.dung.ecommerce.document.Product;
import com.dung.ecommerce.input.SaveUserInput;
import com.dung.ecommerce.document.User;
import com.dung.ecommerce.repository.UserRepository;
import com.dung.ecommerce.response.PageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
@Slf4j
public class UserService extends BaseService<String, User, UserRepository> {
    private final JwtService jwtService;
    protected UserService(UserRepository repository, JwtService jwtService) {
        super(repository);
        this.jwtService = jwtService;
    }
    public User save(SaveUserInput dto, Function<SaveUserInput, User> mapper) {
        User user = mapper.apply(dto);
        return repository.save(user);
    }
    public PageResponse getUsers(Pageable pageable) {
        Page<User> users = findAll(pageable);
        log.info("Found users from ecommerce with page {} and size {}", pageable.getPageNumber(), pageable.getPageSize());
        PageResponse resp = PageResponse.builder()
                .totalElements(users.getTotalElements())
                .size(users.getSize())
                .page(users.getNumber()).build();
        return resp;
    }
    public User findByAccessToken(String accessToken) {
        String email = jwtService.extractUsername(accessToken);
        return findUserByEmail(email);
    }
    public User findUserByEmail(String email) {
        return repository.findUserByEmail(email);
    }
    public User findByProduct(Product product) {
        return repository.findUserByProductsContains(product);
    }
}
