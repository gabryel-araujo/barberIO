package com.example.barberIO.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ServiceRecordDto (@NotBlank(message = "O nome do serviço é obrigatório") String nome,
                                @NotBlank(message = "A descrição do serviço é obrigatória") String descricao,
                                @NotNull(message = "O preço do serviço é obrigatório") Float preco,
                                @NotNull(message = "A duração do serviço é obrigatória") Integer duracao){
}
