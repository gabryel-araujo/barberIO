package com.example.barberIO.services;

import com.example.barberIO.dtos.NovaEmpresaRecordDto;
import com.example.barberIO.models.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NovaEmpresaService {

    @Autowired
    private EmpresaService empresaService;

    @Autowired
    private EnderecoService enderecoService;

    @Autowired
    private ConfigEmpresaService configEmpresaService;

    @Autowired
    private HorarioFuncionamentoService horarioFuncionamentoService;

    @Autowired
    private FuncionarioService funcionarioService;

    @Autowired
    private FeriadoService feriadoService;

    @Transactional
    public void criarNovaEmpresa(NovaEmpresaRecordDto novaEmpresaRecordDto) {

        EmpresaModel empresa = empresaService.cadastrarEmpresa(novaEmpresaRecordDto.empresaRecordDto()).getBody();
        EnderecoModel endereco = enderecoService.cadastrarEndereco(novaEmpresaRecordDto.enderecoRecordDto(), empresa.getId()).getBody();
        ConfigEmpresaModel configEmpresa = configEmpresaService.cadastrarConfiguracao(novaEmpresaRecordDto.configEmpresaRecordDto(),empresa.getId()).getBody();
        List<HorarioFuncionamentoModel> horarioFuncionamento = horarioFuncionamentoService.cadastrarVariosHorarios(novaEmpresaRecordDto.horarioFuncionamentoRecordDto(), configEmpresa.getId(), empresa).getBody();
        FuncionarioModel funcionario =

    }
}
