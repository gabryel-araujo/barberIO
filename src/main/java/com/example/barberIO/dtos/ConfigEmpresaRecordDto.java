package com.example.barberIO.dtos;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;

public record ConfigEmpresaRecordDto(
		@NotNull(message = "A configuração de empresa precisa estar associada a uma empresa existente") Long empresa_id,
		@NotNull(message = "O status da barbearia precisa ser especificado") boolean aberto,
		@NotNull(message = "É necessário especificar um intervalo de atendimento") int intervalo,
		LocalDateTime ultima_alteracao) {}
