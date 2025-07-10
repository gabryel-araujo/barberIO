package com.example.barberIO.dtos;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record EmpresaRecordDto(@NotNull(message = "O nome da empresa não pode ser vazio")String nome, @NotNull(message = "O telefone da empresa não pode ser vazio") String telefone, @NotNull(message = "O email da empresa não pode ser vazio")String email, String nacional_id, LocalDateTime created_at) {
}
