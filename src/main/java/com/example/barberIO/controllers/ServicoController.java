package com.example.barberIO.controllers;

import com.example.barberIO.dtos.ServiceRecordDto;
import com.example.barberIO.models.ServiceModel;
import com.example.barberIO.services.ServiceService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
public class ServicoController extends EmpresaAwareController<ServiceModel, ServiceRecordDto, Long, ServiceService> {

    public ServicoController(ServiceService service) {
        super(service);
    }

    @Override
    protected ServiceModel convertToEntity(ServiceRecordDto dto) {
        ServiceModel entity = new ServiceModel();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }

    @Override
    protected void updateEntityFromDto(ServiceRecordDto dto, ServiceModel entity) {
        BeanUtils.copyProperties(dto, entity, "id", "created_at", "empresa", "barbeiros");
    }

    @GetMapping("public/servico/{empresa_id}")
    public ResponseEntity<List<ServiceModel>> getAllByEmpresaId(@PathVariable Long empresa_id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAllByEmpresaId(empresa_id));
    }

    @GetMapping("/servico")
    public ResponseEntity<List<ServiceModel>> getAllByEmpresaLogada(HttpServletRequest req) {
        return super.handleGetAllByEmpresa(req);
    }

    @GetMapping("/servico/{id}")
    public ResponseEntity<ServiceModel> getOneService(@PathVariable Long id, HttpServletRequest req) {
        return super.handleGetByIdScoped(id, req);
    }

    @PostMapping("/servico")
    public ResponseEntity<ServiceModel> addServico(@RequestBody @Valid ServiceRecordDto serviceRecordDto, HttpServletRequest req) {
        LocalDateTime now = LocalDateTime.now();
        ServiceModel serviceModel = convertToEntity(serviceRecordDto);
        serviceModel.setCreated_at(now);
        serviceModel.setAtivo(true);
        
        com.example.barberIO.models.EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);
        serviceModel.setEmpresa(empresaLogada);

        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(serviceModel));
    }

    @PutMapping("/servico/{id}")
    public ResponseEntity<ServiceModel> editarServico(@PathVariable Long id, @RequestBody @Valid ServiceRecordDto serviceRecordDto, HttpServletRequest req) {
        return super.handleUpdateScoped(id, serviceRecordDto, req);
    }

    @DeleteMapping("/servico/{id}")
    public ResponseEntity<Object> apagarServico(@PathVariable Long id, HttpServletRequest req) {
        return super.handleDeleteScoped(id, req);
    }
}
