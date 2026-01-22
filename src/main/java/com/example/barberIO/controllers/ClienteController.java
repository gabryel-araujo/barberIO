package com.example.barberIO.controllers;

import com.example.barberIO.dtos.ClienteRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.ClienteRepository;
import com.example.barberIO.repositories.EmpresaRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.security.JwtUtil;
import com.example.barberIO.services.ClienteService;
import com.example.barberIO.services.EmpresaService;
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
public class ClienteController {
    @Autowired
    ClienteRepository clienteRepository;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Autowired
    ClienteService clienteService;

    @Autowired
    EmpresaRepository empresaRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("public/clientes/{empresa_id}")
    public ResponseEntity<List<ClienteModel>> getAllClients(@PathVariable Long empresa_id ) {

        return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.findAllByEmpresaId(empresa_id));
    }

    @GetMapping("/clientes")
    public ResponseEntity<List<ClienteModel>> getAllClientsByEmpresa(HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        String token = authHeader.substring(7);
        String usuarioLogado = jwtUtil.extractUsername(token);
        EmpresaModel empresaLogada = funcionarioRepository.findByEmail(usuarioLogado).get().getEmpresa();

        return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.findAllByEmpresaId(empresaLogada.getId()));
    }

    @PostMapping("/public/clientes")
    public ResponseEntity<Object> addCliente(@RequestBody @Valid ClienteRecordDto clienteRecordDto) {
        //Optional<ClienteModel> clienteO = clienteRepository.findByTelefone(clienteRecordDto.telefone());
        Optional<ClienteModel> clienteO = clienteRepository.findByTelefoneAndEmpresa_Id(clienteRecordDto.telefone(), clienteRecordDto.empresa_id());

        if (clienteO.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cliente já cadastrado");
        }

        EmpresaModel empresa = empresaRepository.findById(clienteRecordDto.empresa_id()).get();

        ClienteModel clienteModel = new ClienteModel();
        LocalDateTime now = LocalDateTime.now();
        BeanUtils.copyProperties(clienteRecordDto, clienteModel);
        clienteModel.setEmpresa(empresa);
        clienteModel.setAtivo(true);
        clienteModel.setCreated_at(now);

        return ResponseEntity.status(HttpStatus.CREATED).body(clienteRepository.save(clienteModel));
    }

    @PostMapping("/admin/clientes")
    public ResponseEntity<Object> addClientePrivate(@RequestBody @Valid ClienteRecordDto clienteRecordDto,HttpServletRequest req) {
        Optional<ClienteModel> clienteO = clienteRepository.findByTelefone(clienteRecordDto.telefone());

        if (clienteO.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Cliente já cadastrado");
        }

        String authHeader = req.getHeader("Authorization");
        String token = authHeader.substring(7);
        String usuarioLogado = jwtUtil.extractUsername(token);
        EmpresaModel empresaLogada = funcionarioRepository.findByEmail(usuarioLogado).get().getEmpresa();

        ClienteModel clienteModel = new ClienteModel();

        if(clienteRecordDto.empresa_id() == null){
            clienteModel.setEmpresa(empresaLogada);
        }else{
            EmpresaModel empresaNova = empresaRepository.findById(clienteRecordDto.empresa_id()).get();
            clienteModel.setEmpresa(empresaNova);
        }

        LocalDateTime now = LocalDateTime.now();
        BeanUtils.copyProperties(clienteRecordDto, clienteModel);
        clienteModel.setAtivo(true);
        clienteModel.setCreated_at(now);

        return ResponseEntity.status(HttpStatus.CREATED).body(clienteRepository.save(clienteModel));
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<ClienteModel> editCliente(@PathVariable(value = "id") Long id, @RequestBody @Valid ClienteRecordDto clienteRecordDto) {

        Optional<ClienteModel> clienteO = clienteRepository.findById(id);

        if (clienteO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Cliente não encontrado. Verifique os dados!");
        }

        ClienteModel clienteModel = clienteO.get();
        BeanUtils.copyProperties(clienteRecordDto, clienteModel);
        return ResponseEntity.status(HttpStatus.OK).body(clienteRepository.save(clienteModel));
    }

    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Object> deleteCliente(@PathVariable(value = "id") Long id) {
        Optional<ClienteModel> clienteO = clienteRepository.findById(id);

        if (clienteO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Cliente não encontrado.");
        }

        clienteRepository.delete(clienteO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Cliente removido com sucesso.");
    }

    @GetMapping("/clientes/{id}")
    public ResponseEntity<Object> getOneClient(@PathVariable(value = "id") Long id) {
        ClienteModel clienteO = clienteService.buscarPorId(id);
        return ResponseEntity.status(HttpStatus.OK).body(clienteO);
    }

}
