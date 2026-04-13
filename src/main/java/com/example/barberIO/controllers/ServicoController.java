package com.example.barberIO.controllers;

import com.example.barberIO.dtos.ServiceRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.models.ServiceModel;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.repositories.ServiceRepository;
import com.example.barberIO.security.JwtUtil;
import com.example.barberIO.utils.BarberiOUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
public class ServicoController {
    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private BarberiOUtils barberiOUtils;

    @GetMapping("public/servico/{empresa_id}")
    public ResponseEntity<List<ServiceModel>> getAllByEmpresaId(@PathVariable Long empresa_id){
        return ResponseEntity.status(HttpStatus.OK).body(serviceRepository.findAllByEmpresaId(empresa_id));
    }

    @GetMapping("/servico")
    public ResponseEntity<List<ServiceModel>> getAllByEmpresaLogada(HttpServletRequest req){
        EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);
        return ResponseEntity.status(HttpStatus.OK).body(serviceRepository.findAllByEmpresaId(empresaLogada.getId()));
    }

    @GetMapping("/servico/{id}")
    public ResponseEntity<ServiceModel> getAll(@PathVariable(value = "id")Long id){
        Optional<ServiceModel> serviceO = serviceRepository.findById(id);

        if(serviceO.isEmpty()){
            throw new RecursoNaoEncontradoException("Serviço não localizado! Verifique os dados");
        }

        return ResponseEntity.status(HttpStatus.OK).body(serviceO.get());
    }

    @PostMapping("/servico")
    public ResponseEntity<Object> addServico(@RequestBody @Valid ServiceRecordDto serviceRecordDto, HttpServletRequest req){
        EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);

        ServiceModel serviceModel = new ServiceModel();
        LocalDateTime now = LocalDateTime.now();
        BeanUtils.copyProperties(serviceRecordDto,serviceModel);
        serviceModel.setCreated_at(now);
        serviceModel.setEmpresa(empresaLogada);
        serviceModel.setAtivo(true);

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
