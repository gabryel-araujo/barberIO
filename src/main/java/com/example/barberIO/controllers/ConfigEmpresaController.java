package com.example.barberIO.controllers;

import com.example.barberIO.dtos.ConfigEmpresaRecordDto;
import com.example.barberIO.models.ConfigEmpresaModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.barberIO.services.ConfigEmpresaService;

import java.util.List;

@RestController
public class ConfigEmpresaController {

	@Autowired
	private ConfigEmpresaService configEmpresaService;

	@GetMapping("/configEmpresa")
	public ResponseEntity<List<ConfigEmpresaModel>> listarConfigs() {
		return configEmpresaService.listarConfiguracoes();
	}

	@GetMapping("/configEmpresa/{empresa_id}")
	public ResponseEntity<List<ConfigEmpresaModel>> listarConfigsPorEmpresa(
			@PathVariable("empresa_id") Long empresa_id) {
		return configEmpresaService.listarConfiguracoesPorEmpresa(empresa_id);
	}

	@PostMapping("/configEmpresa/{empresa_id}")
	public ResponseEntity<ConfigEmpresaModel> cadastrarConfig(
			@RequestBody ConfigEmpresaRecordDto configEmpresaRecordDto,
			@PathVariable("empresa_id") Long empresa_id) {
		return configEmpresaService.cadastrarConfiguracao(configEmpresaRecordDto, empresa_id);
	}

	@PutMapping("/configEmpresa")
	public ResponseEntity<ConfigEmpresaModel> editarConfig(
			@RequestBody ConfigEmpresaRecordDto configEmpresaRecordDto,
			@RequestParam("config_id") Long config_id,
			@RequestParam("empresa_id") Long empresa_id) {
		return configEmpresaService.editarConfiguracao(configEmpresaRecordDto, empresa_id, config_id);
	}

	@DeleteMapping("/configEmpresa/{config_id}")
	public ResponseEntity<Object> removerConfig(
			@PathVariable("config_id") Long config_id) {
		return configEmpresaService.removerConfiguracao(config_id);
	}
}
