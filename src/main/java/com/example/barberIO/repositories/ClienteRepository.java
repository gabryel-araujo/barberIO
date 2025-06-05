package com.example.barberIO.repositories;

import com.example.barberIO.models.ClienteModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ClienteRepository extends JpaRepository<ClienteModel, Long> {

    Optional<ClienteModel> findByTelefone(String telefone);
}
