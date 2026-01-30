package com.example.barberIO.controllers;

import com.example.barberIO.dtos.NovaEmpresaRecordDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NovaEmpresaContoller {

    @PostMapping("/novaEmpresa")
    public ResponseEntity<String> adicionarNovaEmpresa(@RequestBody NovaEmpresaRecordDto novaEmpresaRecordDto) {


    }
}
