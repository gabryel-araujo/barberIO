package com.example.barberIO.dtos;

import jakarta.validation.constraints.NotBlank;

public record FuncionarioRecordDto(@NotBlank(message = "O campo nome é obrigatório") String nome, @NotBlank(message = "O campo email é obrigatório") String email, @NotBlank(message = "O campo senha é obrigatório") String senha, String data_nascimento, float avaliacao, float experiencia, int atendimentos, boolean disponivel ) {
}
