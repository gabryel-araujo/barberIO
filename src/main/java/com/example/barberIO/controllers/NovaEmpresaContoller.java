package com.example.barberIO.controllers;

import com.example.barberIO.dtos.NovaEmpresaRecordDto;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.EmpresaRepository;
import com.example.barberIO.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UtilContoller {

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

    @PostMapping("/novaEmpresa")
    public ResponseEntity<String> novaEmpresa(@RequestBody NovaEmpresaRecordDto novaEmpresaRecordDto) {


    }
}
