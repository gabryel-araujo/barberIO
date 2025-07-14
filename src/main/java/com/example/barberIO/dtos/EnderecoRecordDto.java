package com.example.barberIO.dtos;

import com.example.barberIO.models.EmpresaModel;

import jakarta.validation.constraints.NotNull;

public record EnderecoRecordDto(
		@NotNull(message = "O campo rua deve ser preenchido!") String rua,
		String numero,
		String bairro,
		String cep,
		String cidade,
		String complemento,
		@NotNull(message = "O endereço precisa estar associado a uma empresa")
		Long empresa_id
		) {}
