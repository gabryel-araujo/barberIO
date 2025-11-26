package com.example.barberIO.dtos;


import com.example.barberIO.enums.TipoFuncionario;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

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
        LocalDateTime fechamento_ini,
        LocalDateTime fechamento_fim,
        boolean ativo,
        Float comissao
        ) {
}

