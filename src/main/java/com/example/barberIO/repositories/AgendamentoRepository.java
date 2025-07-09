package com.example.barberIO.repositories;

import com.example.barberIO.models.AgendamentoModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AgendamentoRepository extends JpaRepository<AgendamentoModel, Long> {
    @Query("SELECT COUNT(a) > 0 FROM AgendamentoModel a " +
            "WHERE a.barbeiro.id = :funcionarioId " +
            "AND a.horario < :fim " +
            "AND a.fim > :inicio"
    )
    boolean barbeiroOcupado(
                @Param("funcionarioId") Long funcionarioId,
                @Param("inicio") LocalDateTime inicio,
                @Param("fim")LocalDateTime fim
    );

    @Query(value = "SELECT horario, duracao FROM agendamento " +
            "JOIN servico ON agendamento.servico_id = servico.id " +
            "WHERE barbeiro_id = :barbeiroId " +
            "AND horario::date = :dia",
            nativeQuery = true)
    List<Object[]> findAgendamentosComDuracao(@Param("barbeiroId") Long barbeiroId,
                                             @Param("dia") LocalDate dia);

}
