package com.example.barberIO.controllers;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.barberIO.dtos.EmpresaRecordDto;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.EmpresaRepository;

@RestController
public class EmpresaController {
	
	@Autowired
	EmpresaRepository empresaRepository;
	
	@GetMapping("/empresas")
	public ResponseEntity<Object> listarEmpresas(){
		return ResponseEntity.status(HttpStatus.OK).body(empresaRepository.findAll());
	}
	
	@PostMapping("/empresas")
	public ResponseEntity<Object> cadastrarEmpresa(@RequestBody EmpresaRecordDto empresaRecordDto){
		Optional<EmpresaModel> empresaO = empresaRepository.findByEmail(empresaRecordDto.email());
		
		if(empresaO.isEmpty()) {
			EmpresaModel empresa = new EmpresaModel();
			
			BeanUtils.copyProperties(empresaRecordDto, empresa);
			LocalDateTime now = LocalDateTime.now();
			empresa.setCreated_at(now);
			return ResponseEntity.status(HttpStatus.CREATED).body(empresaRepository.save(empresa));
		}
		
		return ResponseEntity.status(HttpStatus.CONFLICT).body("Empresa já cadastrada no sistema");
	}
}
