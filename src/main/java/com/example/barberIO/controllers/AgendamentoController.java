package com.example.barberIO.controllers;

import com.example.barberIO.dtos.AgendamentoRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.AgendamentoModel;
import com.example.barberIO.repositories.AgendamentoRepository;
import com.example.barberIO.services.AgendamentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.util.List;
import java.util.Optional;

@RestController
public class AgendamentoController {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping("/agendamentos")
    public ResponseEntity<List<AgendamentoModel>> listarAgendamentos() {
        return ResponseEntity.status(HttpStatus.OK).body(agendamentoRepository.findAll());
    }

    @GetMapping("/agendamentos/{id}")
    public ResponseEntity<AgendamentoModel> listarAgendamentosPorId(@PathVariable(name = "id") Long id) {
        Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

        if (agendamentoO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Agendamento não localizado! Verifique os dados");
        }

        return ResponseEntity.status(HttpStatus.OK).body(agendamentoO.get());
    }

    @PostMapping("/agendamentos")
    public ResponseEntity<Object> adicionarAgendamento(@RequestBody @Valid AgendamentoRecordDto agendamentoRecordDto) {
        return agendamentoService.agendarHorario(agendamentoRecordDto);
    }

    @PutMapping("/agendamentos/{id}")
    public ResponseEntity<Object> editarAgendamento(@PathVariable(name = "id") Long id, @RequestBody @Valid AgendamentoRecordDto agendamentoRecordDto) {
        Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

        if (agendamentoO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado! Verifique os dados");
        }

        return agendamentoService.editarAgendamento(agendamentoRecordDto, id);
    }

    @DeleteMapping("/agendamentos/{id}")
    public ResponseEntity<Object> removerAgendamento(@PathVariable(name = "id") Long id) {
        return agendamentoService.cancelarHorario(id);
    }

    @GetMapping("/agendamentos/horarioDisponivel")
    public ResponseEntity<Object> getHorariosDisponiveis(
            @RequestParam Long barbeiroId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime data,
            @RequestParam(defaultValue = "15") int intervalo) {

        return agendamentoService.horarioDisponivel(data, barbeiroId, intervalo);
    }

    @GetMapping("/agendamentos/horarios/{barbeiro_id}")
    public ResponseEntity<List<LocalTime>> getHorariosDisponiveis(
            @PathVariable("barbeiro_id") Long barbeiro_id,
            @RequestParam("data") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data,
            @RequestParam("empresa_id") Long empresa_id) {

        List<LocalTime> horariosDisponiveis = agendamentoService
                .horariosDisponiveis(barbeiro_id, data, empresa_id);

        return ResponseEntity.ok(horariosDisponiveis);
    }

}
