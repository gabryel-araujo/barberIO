package com.example.barberIO.dtos;

import java.time.LocalTime;

import jakarta.validation.constraints.NotNull;

public record HorarioFuncionamentoRecordDto(
        @NotNull(message = "O campo status não pode ser vazio") Boolean aberto,
        @NotNull(message = "O campo nome não pode ser vazio") String nome,
        @NotNull(message = "O horário de abertura não pode ser vazio") LocalTime abertura,
        @NotNull(message = "O horário de fechamento não pode ser vazio") LocalTime fechamento, Integer codigo_dia) {
}
