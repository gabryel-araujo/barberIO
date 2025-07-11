package com.example.barberIO.dtos;

import com.example.barberIO.models.EmpresaModel;

import jakarta.validation.constraints.NotNull;

public record EnderecoRecordDto(
		@NotNull(message = "O campo rua deve ser preenchido!") String rua,
		@NotNull(message = "O endereço precisa estar associado a uma empresa")
		@NotNull Long empresaId) {}
