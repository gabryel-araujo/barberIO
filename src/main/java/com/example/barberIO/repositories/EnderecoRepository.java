package com.example.barberIO.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.barberIO.models.EnderecoModel;

@Repository
public interface EnderecoRepository extends JpaRepository<EnderecoModel, Long>{
	
	@Query("SELECT e FROM EnderecoModel e WHERE e.empresa.id = :empresa_id")
	Optional<EnderecoModel> findByEmpresa(@Param("empresa_id") Long empresa_id);

}
