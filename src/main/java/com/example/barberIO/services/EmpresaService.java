package com.example.barberIO.services;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.barberIO.dtos.EmpresaRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.EmpresaRepository;

@Service
public class EmpresaService {

	@Autowired
	private EmpresaRepository empresaRepository;

	public ResponseEntity<Object> cadastrarEmpresa(EmpresaRecordDto empresaRecordDto) {
		Optional<EmpresaModel> empresaO = empresaRepository.findByEmail(empresaRecordDto.email());

		if (empresaO.isEmpty()) {
			EmpresaModel empresa = new EmpresaModel();

			BeanUtils.copyProperties(empresaRecordDto, empresa);
			LocalDateTime now = LocalDateTime.now();
			empresa.setCreated_at(now);
			return ResponseEntity.status(HttpStatus.CREATED).body(empresaRepository.save(empresa));
		}

		return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado no sistema");

	}
	
	public ResponseEntity<EmpresaModel> editarEmpresa(EmpresaRecordDto empresaRecordDto, Long id){
		Optional<EmpresaModel> empresaO = empresaRepository.findById(id);
		
		if(empresaO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Empresa não cadastrada na base de dados!");
		}
		
		EmpresaModel empresa = empresaO.get();
		BeanUtils.copyProperties(empresaRecordDto, empresa,"created_at");
		
		return ResponseEntity.status(HttpStatus.OK).body(empresaRepository.save(empresa));
	}
	
	public ResponseEntity<Object> removerEmpresa(Long id){
		Optional<EmpresaModel> empresaO = empresaRepository.findById(id);
		
		if(empresaO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Empresa não cadastrada na base de dados!");
		}
		
		EmpresaModel empresa = empresaO.get();
		empresaRepository.delete(empresa);
		return ResponseEntity.status(HttpStatus.OK).body("Empresa removida com sucesso!");
	}
	
	public ResponseEntity<EmpresaModel> listarEmpresaPorId(Long id){
		Optional<EmpresaModel> empresaO = empresaRepository.findById(id);
		
		if(empresaO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Empresa não cadastrada na base de dados!");
		}
		
		EmpresaModel empresa = empresaO.get();
		return ResponseEntity.status(HttpStatus.OK).body(empresa);
	}

}
