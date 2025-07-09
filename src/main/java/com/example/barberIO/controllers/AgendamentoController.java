package com.example.barberIO.controllers;
import com.example.barberIO.dtos.AgendamentoRecordDto;
import com.example.barberIO.models.AgendamentoModel;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.repositories.AgendamentoRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.services.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.time.*;
import java.util.List;
import java.util.Optional;

@RestController
public class AgendamentoController{

    @Autowired
    AgendamentoRepository agendamentoRepository;

    @Autowired
    FuncionarioRepository funcionarioRepository;
    @Autowired
    private AgendamentoService agendamentoService;

    @GetMapping("/agendamentos")
    public ResponseEntity<Object> listarAgendamentos(){
        return ResponseEntity.status(HttpStatus.OK).body(agendamentoRepository.findAll());
    }

    @PostMapping("/agendamentos")
    public ResponseEntity<Object> adicionarAgendamento(@RequestBody AgendamentoRecordDto agendamentoRecordDto){
        return agendamentoService.agendarHorario(agendamentoRecordDto);
    }

    @PutMapping("/agendamentos/{id}")
    public ResponseEntity<Object> editarAgendamento(@PathVariable(name = "id")Long id, @RequestBody AgendamentoRecordDto agendamentoRecordDto){
        Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

        if(agendamentoO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não encontrado! Verifique os dados");
        }

        return agendamentoService.editarAgendamento(agendamentoRecordDto, id);
    }

    @DeleteMapping("/agendamentos/{id}")
    public ResponseEntity<Object> removerAgendamento(@PathVariable(name = "id")Long id){
        return agendamentoService.cancelarHorario(id);
    }

    @GetMapping("/agendamentos/horarioDisponivel")
    public ResponseEntity<Object> getHorariosDisponiveis(
            @RequestParam Long barbeiroId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDateTime data,
            @RequestParam(defaultValue = "15") int intervalo) {

        return agendamentoService.horarioDisponivel(data, barbeiroId, intervalo);
    }

    @GetMapping("/agendamentos/horarios/{barbeiroId}")
    public ResponseEntity<List<LocalTime>> getHorariosDisponiveis(
            @PathVariable Long barbeiroId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate data) {

        List<LocalTime> horariosDisponiveis = agendamentoService
                .horariosDisponiveis(barbeiroId, data);

        return ResponseEntity.ok(horariosDisponiveis);
    }

}
