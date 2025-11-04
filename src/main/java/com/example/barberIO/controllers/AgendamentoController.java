package com.example.barberIO.controllers;

import com.example.barberIO.dtos.AgendamentoRecordDto;
import com.example.barberIO.dtos.ResponseAgendamentoRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.AgendamentoModel;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.AgendamentoRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.security.JwtUtil;
import com.example.barberIO.services.AgendamentoService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.List;
import java.util.Optional;

@RestController()
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private AgendamentoService agendamentoService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @GetMapping("/admin/agendamentos")
    public ResponseEntity<List<ResponseAgendamentoRecordDto>> listarAgendamentos(HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");
        String token = authHeader.substring(7);
        String usuarioLogado = jwtUtil.extractUsername(token);
        EmpresaModel empresaLogada = funcionarioRepository.findByEmail(usuarioLogado).get().getEmpresa();

        return agendamentoService.listarAgendamentosMinificado(empresaLogada.getId());
        //return ResponseEntity.status(HttpStatus.OK).body(agendamentoService.listarAgendamentosMinificado(empresaLogada.getId()));
    }
    
    @GetMapping("/agendamentos/{empresa_id}")
    public ResponseEntity<List<ResponseAgendamentoRecordDto>> listarAgendamentosMin(@PathVariable Long empresa_id) {
        return agendamentoService.listarAgendamentosMinificado(empresa_id);
    }

    @GetMapping("/admin/agendamentos/{id}")
    public ResponseEntity<AgendamentoModel> listarAgendamentosPorId(@PathVariable(name = "id") Long id) {
        Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

        if (agendamentoO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Agendamento não localizado! Verifique os dados");
        }

        return ResponseEntity.status(HttpStatus.OK).body(agendamentoO.get());
    }

    @PostMapping("/public/agendamentos/{empresa_id}")
    public ResponseEntity<Object> adicionarAgendamento(@RequestBody @Valid AgendamentoRecordDto agendamentoRecordDto, @PathVariable Long empresa_id) {
        return agendamentoService.agendarHorario(agendamentoRecordDto, empresa_id);
    }

    @PutMapping("/admin/agendamentos/{id}")
    public ResponseEntity<Object> editarAgendamento(@PathVariable(name = "id") Long id, @RequestBody @Valid AgendamentoRecordDto agendamentoRecordDto) {
        Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

        if (agendamentoO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado! Verifique os dados");
        }

        return agendamentoService.editarAgendamento(agendamentoRecordDto, id);
    }

    @DeleteMapping("/admin/agendamentos/{id}")
    public ResponseEntity<Object> removerAgendamento(@PathVariable(name = "id") Long id) {
        return agendamentoService.cancelarHorario(id);
    }

    @DeleteMapping("/public/agendamentos/{id}")
    public ResponseEntity<Object> removerAgendamentoPublic(@PathVariable(name = "id") Long id) {
        return agendamentoService.cancelarHorario(id);
    }

    @GetMapping("/admin/agendamentos/horarioDisponivel")
    public ResponseEntity<Object> getHorariosDisponiveis(
            @RequestParam Long barbeiroId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime data,
            @RequestParam(defaultValue = "15") int intervalo) {

        return agendamentoService.horarioDisponivel(data, barbeiroId, intervalo);
    }

    @GetMapping("/public/agendamentos/horarios/{barbeiro_id}")
    public ResponseEntity<List<LocalTime>> getHorariosDisponiveis(
            @PathVariable("barbeiro_id") Long barbeiro_id,
            @RequestParam("data") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,
            @RequestParam("empresa_id") Long empresa_id) {

        List<LocalTime> horariosDisponiveis = agendamentoService
                .horariosDisponiveis(barbeiro_id, data, empresa_id);

        return ResponseEntity.ok(horariosDisponiveis);
    }

}
