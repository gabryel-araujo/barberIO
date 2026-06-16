package com.example.barberIO.repositories;

import com.example.barberIO.models.EmpresaAware;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

@NoRepositoryBean
public interface EmpresaAwareRepository<T extends EmpresaAware, ID> extends JpaRepository<T, ID> {
    List<T> findAllByEmpresaId(Long empresaId);
}
