package com.example.barberIO.controllers;

import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.repositories.ClienteRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
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
//    @Autowired
//    private ClienteRepository clienteRepository;

    @GetMapping("/funcionarios")
    ResponseEntity<List<FuncionarioModel>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(funcionarioRepository.findAll());
    }

    @PostMapping("/funcionarios")
    ResponseEntity<Object> addFuncionario(@RequestBody @Valid FuncionarioModel funcionarioRecordDto){

        Optional<FuncionarioModel> funcionario = funcionarioRepository.findByEmail(funcionarioRecordDto.getEmail());

        if(funcionario.isPresent()){
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email já cadastrado!");
            return ResponseEntity.ok().body("Email já cadastrado");
        }

        FuncionarioModel funcionarioModel = new FuncionarioModel();
        BeanUtils.copyProperties(funcionarioRecordDto, funcionarioModel);

        return ResponseEntity.status(HttpStatus.CREATED).body(funcionarioRepository.save(funcionarioModel));
    }

    @DeleteMapping("/funcionarios/{id}")
    ResponseEntity<Object> deleteFuncionario(@PathVariable (value = "id") UUID id){
        Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);

        if(funcionarioO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não encontrado.");
        }

        funcionarioRepository.delete(funcionarioO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Funcionário deletado com sucesso!");
    }

    @PutMapping("/funcionarios/{id}")
    ResponseEntity<Object> updateFuncionario(@PathVariable (value = "id")UUID id, @RequestBody @Valid FuncionarioModel funcionarioRecordDto){
        Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);

        if(funcionarioO.isEmpty()){
            return  ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não encontrado!");
        }

        FuncionarioModel funcionarioModel = funcionarioO.get();
        BeanUtils.copyProperties(funcionarioRecordDto, funcionarioModel);
        return ResponseEntity.status(HttpStatus.OK).body("Funcionário atualizado com sucesso!");
    }

}
