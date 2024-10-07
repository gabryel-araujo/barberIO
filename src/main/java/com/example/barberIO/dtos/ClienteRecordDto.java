package com.example.barberIO.dtos;

import jakarta.validation.constraints.NotBlank;

public record ClienteRecordDto(@NotBlank String nome, @NotBlank String email, @NotBlank String senha, @NotBlank String data_nascimento) {
}
