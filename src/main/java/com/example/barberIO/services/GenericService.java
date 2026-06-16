package com.example.barberIO.services;

import java.util.List;
import java.util.Optional;

public interface GenericService<T, ID> {
    List<T> findAll();
    Optional<T> findById(ID id);
    T save(T entity);
    T update(ID id, T entity);
    void deleteById(ID id);
}
