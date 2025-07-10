package com.example.barberIO.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.barberIO.dtos.EmpresaRecordDto;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.EmpresaRepository;
import com.example.barberIO.services.EmpresaService;

import jakarta.validation.Valid;

@RestController
public class EmpresaController {

	@Autowired
	EmpresaRepository empresaRepository;

	@Autowired
	private EmpresaService empresaService;

	@GetMapping("/empresas")
	public ResponseEntity<Object> listarEmpresas() {
		return ResponseEntity.status(HttpStatus.OK).body(empresaRepository.findAll());
	}

	@PostMapping("/empresas")
	public ResponseEntity<Object> cadastrarEmpresa(@RequestBody @Valid EmpresaRecordDto empresaRecordDto) {
		return empresaService.cadastrarEmpresa(empresaRecordDto);
	}

	@PutMapping("/empresas/{id}")
	public ResponseEntity<EmpresaModel> editarEmpresa(@PathVariable(value = "id") Long id,
			@RequestBody @Valid EmpresaRecordDto empresaRecordDto) {
		return empresaService.editarEmpresa(empresaRecordDto, id);
	}

}
