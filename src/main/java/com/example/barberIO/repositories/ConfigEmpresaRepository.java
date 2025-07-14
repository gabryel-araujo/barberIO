package com.example.barberIO.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.barberIO.models.ConfigEmpresaModel;

@Repository
public interface ConfigEmpresaRepository extends JpaRepository<ConfigEmpresaModel, Long>{

}
