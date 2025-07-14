package com.example.barberIO.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.barberIO.dtos.ConfigEmpresaRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ConfigEmpresaModel;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.ConfigEmpresaRepository;
import com.example.barberIO.repositories.EmpresaRepository;

@Service
public class ConfigEmpresaService {
	
	@Autowired 
	private ConfigEmpresaRepository configEmpresaRepository;
	
	@Autowired 
	private EmpresaRepository empresaRepository;
	
	public ResponseEntity<List<ConfigEmpresaModel>> listarConfiguracoes(){
		List<ConfigEmpresaModel> configuracoes = configEmpresaRepository.findAll();
		
		return ResponseEntity.status(HttpStatus.OK).body(configuracoes);
	}
	
	public ResponseEntity<ConfigEmpresaModel> cadastrarConfiguracao(ConfigEmpresaRecordDto configDto, Long empresa_id){
		Optional<EmpresaModel> empresaO = empresaRepository.findById(empresa_id);
		
		if(empresaO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Empresa não localizada na base de dados");
		}
		
		ConfigEmpresaModel configEmpresa = new ConfigEmpresaModel();
		BeanUtils.copyProperties(configDto, configEmpresa);
		LocalDateTime now = LocalDateTime.now();
		configEmpresa.setUltima_alteracao(now);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(configEmpresaRepository.save(configEmpresa));
	}
}
