package com.example.barberIO.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
	public ResponseEntity<EnderecoModel> cadastrarEndereco(@RequestBody @Valid EnderecoRecordDto enderecoRecordDto, @RequestParam(name = "empresa_id")Long empresa_id){
		return enderecoService.cadastrarEndereco(enderecoRecordDto,empresa_id);
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
