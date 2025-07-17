package com.example.barberIO.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.example.barberIO.exceptions.DadosVioladosException;
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
	
	public ResponseEntity<Object> listarEnderecoPorEmpresa(Long empresa_id){
		Optional<EnderecoModel> enderecoO = enderecoRepository.findByEmpresa(empresa_id);
		
		if(enderecoO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Não existe nenhum endereço vinculado a essa empresa!");
		}
		
		return ResponseEntity.status(HttpStatus.OK).body(enderecoO);
	}
	
	public ResponseEntity<EnderecoModel> cadastrarEndereco(EnderecoRecordDto enderecoRecordDto) {
	    EnderecoModel endereco = new EnderecoModel();
	    BeanUtils.copyProperties(enderecoRecordDto, endereco);

		//Primeiramente validar a empresa
	    EmpresaModel empresa = empresaRepository.findById(enderecoRecordDto.empresa_id())
	            .orElseThrow(() -> new RecursoNaoEncontradoException("Empresa não encontrada."));
	    
	    //Validar se já tem empresa cadastrada
	    Optional<EnderecoModel> enderecoO = enderecoRepository.findByEmpresa(enderecoRecordDto.empresa_id());
	    if(!enderecoO.isEmpty()) {
			throw new DadosVioladosException("Já existe um endereço vinculado a essa empresa!");
		}
	    
		//Em seguida, validar o campo cep
		if(enderecoRecordDto.cep().length()!= 8){
			throw new DadosVioladosException("O campo cep deve possuir 8 caracteres");
		}

	    endereco.setEmpresa(empresa);
	    endereco.setCreated_at(LocalDateTime.now());
	    
	    enderecoRepository.save(endereco);
	    return ResponseEntity.status(HttpStatus.CREATED).body(endereco);
	}
	
	public ResponseEntity<EnderecoModel> editarEndereco(EnderecoRecordDto enderecoRecordDto,Long id){
		Optional<EnderecoModel> enderecoO = enderecoRepository.findById(id);

		//Verificando se a empresa existe
		if(enderecoO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Endereço inválido! Verifique os dados");
		}
		//Verificando se o cep está com a quantidade correta de caracteres
		if(enderecoRecordDto.cep().length()!= 8){
			throw new DadosVioladosException("O campo cep deve possuir 8 caracteres");
		}
		
		EnderecoModel endereco = enderecoO.get();
		BeanUtils.copyProperties(enderecoRecordDto, endereco);
		enderecoRepository.save(endereco);
		
		return ResponseEntity.status(HttpStatus.OK).body(endereco);
	}
	
	public ResponseEntity<Object> removerEndereco(Long id){
		Optional<EnderecoModel> enderecoO = enderecoRepository.findById(id);
		
		if(enderecoO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Endereço não localizado!");
		}
		
		EnderecoModel endereco = enderecoO.get();
		
		EmpresaModel empresa = endereco.getEmpresa();
	    if (empresa != null) {
	        empresa.setEndereco(null); 
	    }
		
		enderecoRepository.delete(endereco);
		
		return ResponseEntity.status(HttpStatus.OK).body("Endereco removida com sucesso!");
	}

}
