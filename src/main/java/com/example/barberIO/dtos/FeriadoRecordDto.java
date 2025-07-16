package com.example.barberIO.dtos;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.validation.constraints.NotNull;

public record FeriadoRecordDto(
		@NotNull(message = "O campo nome não pode ser vazio")String nome,
		@NotNull(message = "O horário de abertura não pode ser vazio")LocalDate data,
		@NotNull(message = "O campo recorrente não pode ser vazio")Boolean recorrente) {}
