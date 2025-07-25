package com.example.barberIO.dtos;


import jakarta.validation.constraints.NotBlank;
public record FuncionarioRecordDto(
        @NotBlank(message = "O nome não pode ser vazio") String nome,
        @NotBlank(message = "O email não pode ser vazio") String email,
        @NotBlank(message = "A senha não pode ser vazia") String senha,
        String data_nascimento,
        float avaliacao,
        float experiencia,
        int atendimentos,
        boolean disponivel,
        String[] newServices,
        boolean ativo) {
}

