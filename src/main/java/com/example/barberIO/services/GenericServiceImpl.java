package com.example.barberIO.services;

import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import org.springframework.beans.BeanUtils;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public abstract class GenericServiceImpl<T, ID, R extends JpaRepository<T, ID>> implements GenericService<T, ID> {

    protected final R repository;

    protected GenericServiceImpl(R repository) {
        this.repository = repository;
    }

    @Override
    public List<T> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<T> findById(ID id) {
        return repository.findById(id);
    }

    @Override
    public T save(T entity) {
        return repository.save(entity);
    }

    @Override
    public T update(ID id, T entity) {
        T existing = repository.findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Recurso não encontrado com o ID fornecido."));
        BeanUtils.copyProperties(entity, existing, "id", "created_at");
        return repository.save(existing);
    }

    @Override
    public void deleteById(ID id) {
        if (!repository.existsById(id)) {
            throw new RecursoNaoEncontradoException("Recurso não encontrado com o ID fornecido.");
        }
        repository.deleteById(id);
    }
}
