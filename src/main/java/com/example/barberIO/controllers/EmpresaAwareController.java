package com.example.barberIO.controllers;

import com.example.barberIO.models.EmpresaAware;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.services.EmpresaAwareService;
import com.example.barberIO.utils.BarberiOUtils;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

public abstract class EmpresaAwareController<T extends EmpresaAware, DTO, ID, S extends EmpresaAwareService<T, ID>>
        extends GenericController<T, DTO, ID, S> {

    @Autowired
    protected BarberiOUtils barberiOUtils;

    protected EmpresaAwareController(S service) {
        super(service);
    }

    @Override
    public ResponseEntity<List<T>> handleGetAll() {
        throw new UnsupportedOperationException("Para listar recursos de uma empresa, utilize o método de escopo de empresa.");
    }

    public ResponseEntity<List<T>> handleGetAllByEmpresa(HttpServletRequest req) {
        EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);
        return ResponseEntity.status(HttpStatus.OK).body(service.findAllByEmpresaId(empresaLogada.getId()));
    }

    @Override
    public ResponseEntity<T> handleGetById(ID id) {
        throw new UnsupportedOperationException("Para buscar um recurso, utilize o método de escopo de empresa.");
    }

    public ResponseEntity<T> handleGetByIdScoped(ID id, HttpServletRequest req) {
        EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);
        return service.findById(id)
                .map(existing -> {
                    if (existing.getEmpresa() == null || !existing.getEmpresa().getId().equals(empresaLogada.getId())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).<T>build();
                    }
                    return ResponseEntity.status(HttpStatus.OK).body(existing);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<T> handleCreate(DTO dto) {
        throw new UnsupportedOperationException("Para criar um recurso, utilize o método de escopo de empresa.");
    }

    public ResponseEntity<T> handleCreateScoped(DTO dto, HttpServletRequest req) {
        EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);
        T entity = convertToEntity(dto);
        entity.setEmpresa(empresaLogada);
        T saved = service.save(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @Override
    public ResponseEntity<T> handleUpdate(ID id, DTO dto) {
        throw new UnsupportedOperationException("Para atualizar um recurso, utilize o método de escopo de empresa.");
    }

    public ResponseEntity<T> handleUpdateScoped(ID id, DTO dto, HttpServletRequest req) {
        EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);
        return service.findById(id)
                .map(existing -> {
                    if (existing.getEmpresa() == null || !existing.getEmpresa().getId().equals(empresaLogada.getId())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).<T>build();
                    }
                    updateEntityFromDto(dto, existing);
                    T updated = service.save(existing);
                    return ResponseEntity.status(HttpStatus.OK).body(updated);
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @Override
    public ResponseEntity<Object> handleDelete(ID id) {
        throw new UnsupportedOperationException("Para deletar um recurso, utilize o método de escopo de empresa.");
    }

    public ResponseEntity<Object> handleDeleteScoped(ID id, HttpServletRequest req) {
        EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);
        return service.findById(id)
                .map(existing -> {
                    if (existing.getEmpresa() == null || !existing.getEmpresa().getId().equals(empresaLogada.getId())) {
                        return ResponseEntity.status(HttpStatus.FORBIDDEN).body((Object) "Acesso negado.");
                    }
                    service.deleteById(id);
                    return ResponseEntity.status(HttpStatus.OK).body((Object) "Removido com sucesso.");
                })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recurso não encontrado."));
    }
}
