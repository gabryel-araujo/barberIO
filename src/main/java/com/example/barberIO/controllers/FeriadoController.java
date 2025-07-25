package com.example.barberIO.controllers;

import com.example.barberIO.dtos.FeriadoRecordDto;
import com.example.barberIO.models.FeriadoModel;
import com.example.barberIO.services.FeriadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/feriados")
public class FeriadoController {

    @Autowired
    private FeriadoService feriadoService;

    @GetMapping
    public ResponseEntity<List<FeriadoModel>> listarTodos() {
        return feriadoService.listarFeriados();
    }

    @GetMapping("/config/{configEmpresaId}")
    public ResponseEntity<List<FeriadoModel>> listarPorConfigEmpresa(@PathVariable Long configEmpresaId) {
        return feriadoService.listarPorConfigEmpresa(configEmpresaId);
    }

    @PostMapping("/{configEmpresaId}")
    public ResponseEntity<FeriadoModel> cadastrar(@RequestBody @Valid FeriadoRecordDto dto, @PathVariable Long configEmpresaId) {
        return feriadoService.cadastrarFeriado(dto, configEmpresaId);
    }

    @PutMapping("/{feriadoId}")
    public ResponseEntity<FeriadoModel> editar(@RequestBody @Valid FeriadoRecordDto dto, @PathVariable Long feriadoId) {
        return feriadoService.editarFeriado(dto, feriadoId);
    }

    @DeleteMapping("/{feriadoId}")
    public ResponseEntity<Object> remover(@PathVariable Long feriadoId) {
        return feriadoService.removerFeriado(feriadoId);
    }
}
