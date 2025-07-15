package com.example.barberIO.dtos;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ConfigEmpresaRecordDto(
		@NotNull(message = "A configuração de empresa precisa estar associada a uma empresa existente") Long empresa_id,
		@NotNull(message = "O status da barbearia precisa ser especificado") Boolean aberto,
		@NotNull(message = "É necessário especificar um intervalo de atendimento") @Min(value = 15, message = "O intervalo mínimo deve ser de 10 minutos")
		int intervalo) {}
