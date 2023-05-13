package com.dung.ecommerce.service;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public abstract class BaseService<I extends Serializable, T, R extends MongoRepository<T, I>> {
    protected final R repository;
    protected BaseService(R repository) {
        this.repository = repository;
    }
    public Optional<T> findById(I id) { return repository.findById(id); }
    public List<T> findAll() {
        return repository.findAll();
    }
    public T save(T entity) {
        return repository.save(entity);
    }
    public T insert(T entity) {
        return repository.insert(entity);
    }
    public Page<T> findAll(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
