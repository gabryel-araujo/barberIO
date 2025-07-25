package com.example.barberIO.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.barberIO.models.FeriadoModel;

import java.util.List;

@Repository
public interface FeriadoRepository extends JpaRepository<FeriadoModel, Long>{
	
	@Query("SELECT f FROM FeriadoModel f WHERE f.config_empresa.id = :config_empresa_id")
	List<FeriadoModel> findAllByEmpresa(@Param("config_empresa_id") Long config_empresa_id);
}
