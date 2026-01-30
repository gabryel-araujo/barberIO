package com.example.barberIO.dtos;


import jakarta.validation.constraints.NotBlank;

import java.util.List;

public record NovaEmpresaRecordDto(
        @NotBlank(message = "Empresa inválida") EmpresaRecordDto empresaRecordDto,
        @NotBlank(message = "Endereço inválido") EnderecoRecordDto enderecoRecordDto,
        @NotBlank(message = "Configuração de empresa inválida") ConfigEmpresaRecordDto configEmpresaRecordDto,
        @NotBlank(message = "Horário de funcionamento inválido") List<HorarioFuncionamentoRecordDto> horarioFuncionamentoRecordDto,
        @NotBlank(message = "Dados do funcionário inválido") FuncionarioRecordDto funcionarioRecordDto,
        FeriadoRecordDto feriadoRecordDto
) {}
