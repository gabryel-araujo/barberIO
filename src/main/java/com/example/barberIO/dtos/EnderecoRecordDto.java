package com.example.barberIO.dtos;

import jakarta.validation.constraints.NotNull;

public record EnderecoRecordDto(
		@NotNull(message = "O campo rua deve ser preenchido!") String rua,
		String numero,
		String bairro,
		String cep,
		String cidade,
		String complemento
		) {}
