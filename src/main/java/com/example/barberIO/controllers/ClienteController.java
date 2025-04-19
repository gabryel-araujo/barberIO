package com.example.barberIO.controllers;

import com.example.barberIO.dtos.ClienteRecordDto;
import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.repositories.ClienteRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class ClienteController {
    @Autowired
    ClienteRepository clienteRepository;

    @GetMapping("/clientes")
    public ResponseEntity<List<ClienteModel>> getAllClients(){
        return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.findAll());
    }

    @PostMapping("/clientes")
    public ResponseEntity<ClienteModel> addCliente(@RequestBody @Valid ClienteModel clienteRecordDto){
        ClienteModel clienteModel = new ClienteModel();
        BeanUtils.copyProperties(clienteRecordDto, clienteModel);

        return ResponseEntity.status(HttpStatus.CREATED).body(clienteRepository.save(clienteModel));
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Object> editCliente(@PathVariable (value = "id") Long id, @RequestBody @Valid ClienteModel clienteRecordDto){
        Optional<ClienteModel> clienteO = clienteRepository.findById(id);

        if(clienteO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        ClienteModel clienteModel = clienteO.get();
        BeanUtils.copyProperties(clienteRecordDto, clienteModel);
        return  ResponseEntity.status(HttpStatus.OK).body(clienteRepository.save(clienteModel));
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Object> deleteCliente(@PathVariable (value = "id") Long id){
        Optional<ClienteModel> clienteO = clienteRepository.findById(id);

        if(clienteO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        clienteRepository.delete(clienteO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Cliente removido com sucesso.");
    }

    //Um comentário só pra testar o git
    @GetMapping("/clientes/{id}")
    public ResponseEntity<Object> getOneClient(@PathVariable (value = "id") Long id ){
        Optional<ClienteModel> clienteO = clienteRepository.findById(id);
        if(clienteO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado");
        }
        return ResponseEntity.status(HttpStatus.OK).body(clienteO.get());
    }

}
