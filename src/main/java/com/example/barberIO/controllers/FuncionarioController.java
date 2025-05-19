package com.example.barberIO.controllers;

import com.example.barberIO.dtos.FuncionarioRecordDto;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.models.ServiceModel;
import com.example.barberIO.repositories.ClienteRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.repositories.ServiceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class FuncionarioController {
    @Autowired
    FuncionarioRepository funcionarioRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    @GetMapping("/funcionarios")
    public ResponseEntity<List<FuncionarioModel>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioRepository.findAll());
    }

    @PostMapping("/funcionarios")
    public ResponseEntity<Object> addFuncionario(@RequestBody @Valid FuncionarioModel funcionarioRecordDto){

        Optional<FuncionarioModel> funcionario = funcionarioRepository.findByEmail(funcionarioRecordDto.getEmail());

        if(funcionario.isPresent()){
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado!");
            return ResponseEntity.ok().body("Email já cadastrado");
        }

        FuncionarioModel funcionarioModel = new FuncionarioModel();
        BeanUtils.copyProperties(funcionarioRecordDto, funcionarioModel);

        return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioRepository.save(funcionarioModel));
    }

    @PutMapping("/funcionarios/{id}")
    public ResponseEntity<Object> updateFuncionario(@PathVariable (value = "id")Long id, @RequestBody @Valid FuncionarioRecordDto funcionarioRecordDto){
        Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);

        if(funcionarioO.isEmpty()){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não encontrado!");
        }

        FuncionarioModel funcionarioModel = funcionarioO.get();
        BeanUtils.copyProperties(funcionarioRecordDto, funcionarioModel);
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioRepository.save(funcionarioModel));
    }

    @DeleteMapping("/funcionarios/{id}")
    public ResponseEntity<Object> deleteFuncionario(@PathVariable (value = "id") Long id){
        Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);

        if(funcionarioO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não encontrado.");
        }

        funcionarioRepository.delete(funcionarioO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Funcionário deletado com sucesso!");
    }

    @PatchMapping("/funcionarios/{id}/adicionarServico/{servicoId}")
    public ResponseEntity<Object> adicionarServico(@PathVariable(value = "id")Long id,@PathVariable(value = "servicoId")Long servicoId){
        Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);
        Optional<ServiceModel> serviceO = serviceRepository.findById(servicoId);

        if(funcionarioO.isEmpty() || serviceO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário ou serviço não encontrados!");
        }

        FuncionarioModel funcionarioModel = funcionarioO.get();
        ServiceModel serviceModel = serviceO.get();

        boolean servicoAdicionado = funcionarioModel.getServicos().stream().anyMatch(s -> s.getId().equals(serviceModel.getId()));

        if(servicoAdicionado){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Serviço já adicionado!");
        }

        funcionarioModel.getServicos().add(serviceModel);
        funcionarioRepository.save(funcionarioModel);

        return ResponseEntity.status(HttpStatus.OK).body(funcionarioModel);

    }

    @PatchMapping("/funcionarios/{id}/removerServico/{servicoId}")
    public ResponseEntity<Object> removerServico(@PathVariable(value = "id")Long id, @PathVariable(value = "servicoId")Long servicoId){
        Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);
        Optional<ServiceModel> servicoO = serviceRepository.findById(servicoId);

        if(funcionarioO.isEmpty()||servicoO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário ou serviço não encontrados!");
        }

        FuncionarioModel funcionario = funcionarioO.get();
        ServiceModel servico = servicoO.get();

        funcionario.getServicos().removeIf(s->s.getId().equals(servico.getId()));
        funcionarioRepository.save(funcionario);

        return ResponseEntity.status(HttpStatus.OK).body(funcionario);

    }
}
