package com.example.barberIO.controllers;

import com.example.barberIO.dtos.ServiceRecordDto;
import com.example.barberIO.models.ServiceModel;
import com.example.barberIO.repositories.ServiceRepository;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
public class ServiceController {
    @Autowired
    ServiceRepository serviceRepository;

    @GetMapping("/servico")
    public ResponseEntity<List<ServiceModel>> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(serviceRepository.findAll());
    }

    @PostMapping("/servico")
    public ResponseEntity<Object> addServico(@RequestBody @Valid ServiceRecordDto serviceRecordDto){
        ServiceModel serviceModel = new ServiceModel();
        BeanUtils.copyProperties(serviceRecordDto,serviceModel);

        return ResponseEntity.status(HttpStatus.CREATED).body(serviceRepository.save(serviceModel));
    }

    @PutMapping("/servico/{id}")
    public ResponseEntity<Object> editarServico(@PathVariable(value = "id") Long id, @RequestBody @Valid ServiceRecordDto serviceRecordDto){
        Optional<ServiceModel> serviceO = serviceRepository.findById(id);

        if(serviceO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado!");
        }
        ServiceModel serviceModel = serviceO.get();
        BeanUtils.copyProperties(serviceRecordDto,serviceModel);

        return ResponseEntity.status(HttpStatus.OK).body(serviceRepository.save(serviceModel));
    }

    @DeleteMapping("/servico/{id}")
    public ResponseEntity<Object> apagarServico(@PathVariable(value = "id")Long id){
        Optional<ServiceModel> serviceO = serviceRepository.findById(id);

        if(serviceO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Serviço não encontrado!");
        }

        serviceRepository.delete(serviceO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Serviço removido!");
    }

}
