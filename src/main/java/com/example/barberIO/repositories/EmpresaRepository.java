package com.example.barberIO.repositories;

import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.models.EmpresaModel;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmpresaRepository extends JpaRepository<EmpresaModel, Long> {
	
	Optional<EmpresaModel> findByEmail(String email);
}
