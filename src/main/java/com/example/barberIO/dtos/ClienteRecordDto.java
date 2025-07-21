package com.example.barberIO.dtos;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;

public record ClienteRecordDto(
            @NotBlank(message = "O campo nome não pode ser vazio") String nome,
            @NotBlank(message = "O campo telefone não pode ser vazio") String telefone,
            boolean ativo){}
