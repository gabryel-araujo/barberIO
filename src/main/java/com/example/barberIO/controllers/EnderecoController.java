package com.example.barberIO.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.barberIO.dtos.EnderecoRecordDto;
import com.example.barberIO.models.EnderecoModel;
import com.example.barberIO.services.EnderecoService;

import jakarta.validation.Valid;

@RestController
public class EnderecoController {
	
	@Autowired
	private EnderecoService enderecoService;
	
	@GetMapping("/enderecos")
	public ResponseEntity<List<EnderecoModel>> listarEnderecos(){
		return enderecoService.listarEnderecos();
	}
	
	@GetMapping("/enderecos/empresa/{id}")
	public ResponseEntity<Object> listarEnderecosPorEmpresa(@PathVariable(name = "id")Long id){
		return enderecoService.listarEnderecoPorEmpresa(id);
	}
	
	@PostMapping("/enderecos")
	public ResponseEntity<EnderecoModel> cadastrarEndereco(@RequestBody @Valid EnderecoRecordDto enderecoRecordDto){
		return enderecoService.cadastrarEndereco(enderecoRecordDto);
	}
	
	@PutMapping("/enderecos/{id}")
	public ResponseEntity<EnderecoModel> editarEndereco(@PathVariable(name = "id")Long id, @RequestBody @Valid EnderecoRecordDto enderecoRecordDto){
		return enderecoService.editarEndereco(enderecoRecordDto, id);
	}
	
	@DeleteMapping("/enderecos/{id}")
	public ResponseEntity<Object> removerEndereco(@PathVariable(name = "id")Long id){
		return enderecoService.removerEndereco(id);
	}
}
