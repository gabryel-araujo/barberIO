package com.example.barberIO.services;

import com.example.barberIO.models.EmpresaAware;
import com.example.barberIO.repositories.EmpresaAwareRepository;
import java.util.List;

public abstract class EmpresaAwareServiceImpl<T extends EmpresaAware, ID, R extends EmpresaAwareRepository<T, ID>>
        extends GenericServiceImpl<T, ID, R> implements EmpresaAwareService<T, ID> {

    protected EmpresaAwareServiceImpl(R repository) {
        super(repository);
    }

    @Override
    public List<T> findAllByEmpresaId(Long empresaId) {
        return repository.findAllByEmpresaId(empresaId);
    }
}
