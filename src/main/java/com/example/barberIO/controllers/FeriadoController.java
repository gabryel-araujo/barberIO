package com.example.barberIO.controllers;

import com.example.barberIO.dtos.FeriadoRecordDto;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.models.FeriadoModel;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.security.JwtUtil;
import com.example.barberIO.services.EmpresaService;
import com.example.barberIO.services.FeriadoService;
import com.example.barberIO.services.FuncionarioService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/feriados")
public class FeriadoController {

    @Autowired
    private FeriadoService feriadoService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @GetMapping
    public ResponseEntity<List<FeriadoModel>> listarTodos() {
        return feriadoService.listarFeriados();
    }

    @GetMapping("/config/{configEmpresaId}")
    public ResponseEntity<List<FeriadoModel>> listarPorConfigEmpresa(@PathVariable Long configEmpresaId) {
        return feriadoService.listarPorConfigEmpresa(configEmpresaId);
    }

    @PostMapping("/{configEmpresaId}")
    public ResponseEntity<FeriadoModel> cadastrar(
            @RequestBody @Valid FeriadoRecordDto dto,
            @PathVariable Long configEmpresaId,
            HttpServletRequest req
    ) {
        String authHeader = req.getHeader("Authorization");
        String token = authHeader.substring(7);
        String usuarioLogado = jwtUtil.extractUsername(token);
        EmpresaModel empresaLogada = funcionarioRepository.findByEmail(usuarioLogado).get().getEmpresa();
        return feriadoService.cadastrarFeriado(dto, configEmpresaId,empresaLogada);
    }

    @PutMapping("/{feriadoId}")
    public ResponseEntity<FeriadoModel> editar(@RequestBody @Valid FeriadoRecordDto dto, @PathVariable Long feriadoId) {
        return feriadoService.editarFeriado(dto, feriadoId);
    }

    @DeleteMapping("/{feriadoId}")
    public ResponseEntity<Object> remover(@PathVariable Long feriadoId) {
        return feriadoService.removerFeriado(feriadoId);
    }
}
