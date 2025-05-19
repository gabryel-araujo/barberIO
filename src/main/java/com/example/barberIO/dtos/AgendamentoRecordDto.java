package com.example.barberIO.dtos;

import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.models.ServiceModel;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

public record AgendamentoRecordDto (@NotNull(message = "Deve ser definido um horáio para o agendamento") LocalDateTime horario, @NotNull(message = "Deve ser atribuído um profissional para o agendamento") FuncionarioModel barbeiro, @NotNull(message = "Deve ser atribuído um serviço para o agendamento") ServiceModel servico, @NotNull(message = "Deve ser atribuído um cliente para o agendamento") ClienteModel cliente, @NotNull(message = "O tempo de finalização do atendimento deve ser estipulado") LocalDateTime fim){
}
