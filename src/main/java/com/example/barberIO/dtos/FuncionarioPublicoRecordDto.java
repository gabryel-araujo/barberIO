package com.example.barberIO.dtos;

import java.util.List;

import com.example.barberIO.enums.TipoFuncionario;
import com.example.barberIO.models.ServiceModel;

public record FuncionarioPublicoRecordDto(
		Long id,
        String nome,
        float avaliacao,
        float experiencia,
        int atendimentos,
        boolean disponivel,
        List<ServiceModel> servicos,
        boolean ativo,
		String avatar,
        String email) {
}

