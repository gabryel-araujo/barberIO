package com.example.barberIO.repositories;

import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.models.FuncionarioModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface FuncionarioRepository extends JpaRepository<FuncionarioModel, Long> {


    Optional<FuncionarioModel> findByEmail(String email);
}
