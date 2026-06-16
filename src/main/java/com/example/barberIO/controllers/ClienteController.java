package com.example.barberIO.controllers;

import com.example.barberIO.dtos.ClienteRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.EmpresaRepository;
import com.example.barberIO.services.ClienteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
public class ClienteController extends EmpresaAwareController<ClienteModel, ClienteRecordDto, Long, ClienteService> {

    private final EmpresaRepository empresaRepository;

    public ClienteController(ClienteService service, EmpresaRepository empresaRepository) {
        super(service);
        this.empresaRepository = empresaRepository;
    }

    @Override
    protected ClienteModel convertToEntity(ClienteRecordDto dto) {
        ClienteModel entity = new ClienteModel();
        BeanUtils.copyProperties(dto, entity);
        return entity;
    }

    @Override
    protected void updateEntityFromDto(ClienteRecordDto dto, ClienteModel entity) {
        BeanUtils.copyProperties(dto, entity, "id", "created_at", "empresa");
    }

    @GetMapping("public/clientes/{empresa_id}")
    public ResponseEntity<List<ClienteModel>> getAllClients(@PathVariable Long empresa_id) {
        return ResponseEntity.status(HttpStatus.OK).body(service.findAllByEmpresaId(empresa_id));
    }

    @GetMapping("/clientes")
    public ResponseEntity<List<ClienteModel>> getAllClientsByEmpresa(HttpServletRequest req) {
        return super.handleGetAllByEmpresa(req);
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<ClienteModel> getOneClient(@PathVariable Long id, HttpServletRequest req) {
        return super.handleGetByIdScoped(id, req);
    }

    @PostMapping("/public/clientes")
    public ResponseEntity<Object> addCliente(@RequestBody @Valid ClienteRecordDto clienteRecordDto) {
        Optional<ClienteModel> clienteO = service.findByTelefoneAndEmpresaId(clienteRecordDto.telefone(), clienteRecordDto.empresa_id());

        if (clienteO.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cliente já cadastrado");
        }

        EmpresaModel empresa = empresaRepository.findById(clienteRecordDto.empresa_id())
                .orElseThrow(() -> new RecursoNaoEncontradoException("Empresa não encontrada"));

        ClienteModel clienteModel = convertToEntity(clienteRecordDto);
        clienteModel.setEmpresa(empresa);
        clienteModel.setAtivo(true);
        clienteModel.setCreated_at(LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(clienteModel));
    }

    @PostMapping("/admin/clientes")
    public ResponseEntity<Object> addClientePrivate(@RequestBody @Valid ClienteRecordDto clienteRecordDto, HttpServletRequest req) {
        Optional<ClienteModel> clienteO = service.findByTelefone(clienteRecordDto.telefone());

        if (clienteO.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cliente já cadastrado");
        }
        
        EmpresaModel empresaLogada = barberiOUtils.validarEmpresaLogada(req);
        ClienteModel clienteModel = convertToEntity(clienteRecordDto);

        if (clienteRecordDto.empresa_id() == null) {
            clienteModel.setEmpresa(empresaLogada);
        } else {
            EmpresaModel empresaNova = empresaRepository.findById(clienteRecordDto.empresa_id())
                    .orElseThrow(() -> new RecursoNaoEncontradoException("Empresa não encontrada"));
            clienteModel.setEmpresa(empresaNova);
        }

        clienteModel.setAtivo(true);
        clienteModel.setCreated_at(LocalDateTime.now());

        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(clienteModel));
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<ClienteModel> editCliente(@PathVariable Long id, @RequestBody @Valid ClienteRecordDto clienteRecordDto, HttpServletRequest req) {
        return super.handleUpdateScoped(id, clienteRecordDto, req);
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Object> deleteCliente(@PathVariable Long id, HttpServletRequest req) {
        return super.handleDeleteScoped(id, req);
    }
}
