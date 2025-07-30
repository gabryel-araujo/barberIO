package com.example.barberIO.dtos;

import java.time.LocalDateTime;

public record ResponseAgendamentoRecordDto(
		LocalDateTime horario,
		LocalDateTime fim,
		String barbeiro,
		String cliente,
		String telefone,
		String servico,
		Float preco
		) {

}
