package com.example.barberIO.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.barberIO.models.ConfigEmpresaModel;

import java.util.List;

@Repository
public interface ConfigEmpresaRepository extends JpaRepository<ConfigEmpresaModel, Long>{

    @Query("SELECT c FROM ConfigEmpresaModel c where c.empresa.id = :empresa_id")
    List<ConfigEmpresaModel> listarConfigsPorEmpresa(@Param("empresa_id") Long empresa_id);

}
