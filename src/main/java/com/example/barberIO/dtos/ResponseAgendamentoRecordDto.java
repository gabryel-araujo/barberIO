package com.example.barberIO.dtos;

import com.example.barberIO.enums.TipoAgendamento;

import java.time.LocalDateTime;

public record ResponseAgendamentoRecordDto(
		Long id,
		LocalDateTime horario,
		LocalDateTime fim,
		String barbeiro,
		String cliente,
		String telefone,
		String servico,
		Float preco,
		TipoAgendamento status
		) {

}
