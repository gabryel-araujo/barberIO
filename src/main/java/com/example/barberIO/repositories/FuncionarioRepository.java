package com.example.barberIO.repositories;

import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.models.FuncionarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface FuncionarioRepository extends JpaRepository<FuncionarioModel, UUID> {

}
