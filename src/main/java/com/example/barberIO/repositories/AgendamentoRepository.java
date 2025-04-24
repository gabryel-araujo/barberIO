package com.example.barberIO.repositories;

import com.example.barberIO.models.AgendamentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {
    @Query("SELECT COUNT(a) > 0 FROM AgendamentoModel a " +
            "WHERE a.barbeiro.id = :funcionarioId " +
            "AND a.horario < :fim " +
            "AND a.fim > :inicio")
    boolean barbeiroOcupado(@Param("funcionarioId") Long funcionarioId,
                                       @Param("inicio") LocalDateTime inicio,
                                       @Param("fim")LocalDateTime fim);

}

//@Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END " +
//        "FROM AgendamentoModel a " +
//        "WHERE a.barbeiro.id = :funcionarioId " +
//        "AND (:inicio < a.fim AND :fim > a.horario)")