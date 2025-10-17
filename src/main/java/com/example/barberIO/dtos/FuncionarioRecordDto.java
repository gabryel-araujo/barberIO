package com.example.barberIO.dtos;


import com.example.barberIO.enums.TipoFuncionario;
import jakarta.validation.constraints.NotBlank;
public record FuncionarioRecordDto(
        @NotBlank(message = "O nome não pode ser vazio") String nome,
        @NotBlank(message = "O email não pode ser vazio") String email,
        String senha,
        String data_nascimento,
        float avaliacao,
        float experiencia,
        int atendimentos,
        boolean disponivel,
        TipoFuncionario tipo,
        String[] newServices,
        String avatar,
        Long empresa_id,
        boolean ativo) {
}

