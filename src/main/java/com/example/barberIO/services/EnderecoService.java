package com.example.barberIO.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.barberIO.dtos.EnderecoRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.models.EnderecoModel;
import com.example.barberIO.repositories.EmpresaRepository;
import com.example.barberIO.repositories.EnderecoRepository;

@Service
public class EnderecoService {
	
	@Autowired
	private EnderecoRepository enderecoRepository;
	
	@Autowired
	private EmpresaRepository empresaRepository;
	
	public ResponseEntity<List<EnderecoModel>> listarEnderecos(){
		return ResponseEntity.status(HttpStatus.OK).body(enderecoRepository.findAll());
	}
	
	public ResponseEntity<List<Object>> listarEnderecoPorEmpresa(Long empresa_id){
		List<Object> enderecoO = enderecoRepository.findByEmpresa(empresa_id);
		
		if(enderecoO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Não existe nenhum endereço vinculado a essa empresa!");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(enderecoO);
	}
	
	public ResponseEntity<EnderecoModel> cadastrarEndereco(EnderecoRecordDto dto) {
	    EnderecoModel endereco = new EnderecoModel();
	    BeanUtils.copyProperties(dto, endereco);
	    
	    EmpresaModel empresa = empresaRepository.findById(dto.empresaId())
	            .orElseThrow(() -> new RecursoNaoEncontradoException("Empresa não encontrada."));

	    // Se tiver empresaId no DTO, relacionar com a empresa
//	    Optional<EmpresaModel> empresaOpt = empresaRepository.findById(dto.empresa_id());
//	    if (empresaOpt.isEmpty()) {
//	        throw new RecursoNaoEncontradoException("Empresa não encontrada com ID: " + dto.empresa_id());
//	    }

	    endereco.setEmpresa(empresa);
	    endereco.setCreated_at(LocalDateTime.now());
	    
	    enderecoRepository.save(endereco);
	    return ResponseEntity.status(HttpStatus.CREATED).body(endereco);
	}
	
	public ResponseEntity<EnderecoModel> editarEndereco(EnderecoRecordDto enderecoRecordDto,Long id){
		Optional<EnderecoModel> enderecoO = enderecoRepository.findById(id);
		
		if(enderecoO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Nenhum endereço localizado!");
		}
		
		EnderecoModel endereco = enderecoO.get();
		BeanUtils.copyProperties(enderecoRecordDto, endereco);
		
		return ResponseEntity.status(HttpStatus.OK).body(endereco);
	}
	
	public ResponseEntity<Object> removerEndereco(Long id){
		Optional<EnderecoModel> enderecoO = enderecoRepository.findById(id);
		
		if(enderecoO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Endereço não localizado!");
		}
		EnderecoModel endereco = enderecoO.get();
		enderecoRepository.delete(endereco);
		
		return ResponseEntity.status(HttpStatus.OK).body("Empresa removida com sucesso!");
	}

}
