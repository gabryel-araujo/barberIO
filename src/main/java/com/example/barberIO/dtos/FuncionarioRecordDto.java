package com.example.barberIO.dtos;

import jakarta.validation.constraints.NotBlank;

public record FuncionarioRecordDto(@NotBlank String nome, @NotBlank String email, @NotBlank String senha, String data_nascimento, float avaliacao, float experiencia, int atendimentos ) {
}
