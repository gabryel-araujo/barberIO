package com.example.barberIO.services;

import com.example.barberIO.models.EmpresaAware;
import java.util.List;

public interface EmpresaAwareService<T extends EmpresaAware, ID> extends GenericService<T, ID> {
    List<T> findAllByEmpresaId(Long empresaId);
}
