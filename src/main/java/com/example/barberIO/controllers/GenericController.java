package com.example.barberIO.controllers;

import com.example.barberIO.services.GenericService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public abstract class GenericController<T, DTO, ID, S extends GenericService<T, ID>> {

    protected final S service;

    protected GenericController(S service) {
        this.service = service;
    }

    protected abstract T convertToEntity(DTO dto);
    
    protected abstract void updateEntityFromDto(DTO dto, T entity);

    public ResponseEntity<List<T>> handleGetAll() {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAll());
    }

    public ResponseEntity<T> handleGetById(ID id) {
        return service.findById(id)
                .map(entity -> ResponseEntity.status(HttpStatus.OK).body(entity))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity<T> handleCreate(DTO dto) {
        T entity = convertToEntity(dto);
        T saved = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    public ResponseEntity<T> handleUpdate(ID id, DTO dto) {
        return service.findById(id)
                .map(existing -> {
                    updateEntityFromDto(dto, existing);
                    T updated = service.save(existing);
                    return ResponseEntity.status(HttpStatus.OK).body(updated);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    public ResponseEntity<Object> handleDelete(ID id) {
        return service.findById(id)
                .map(entity -> {
                    service.deleteById(id);
                    return ResponseEntity.status(HttpStatus.OK).body((Object) "Removido com sucesso.");
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recurso não encontrado."));
    }
}
