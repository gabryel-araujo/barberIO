package com.example.barberIO.controllers;
import com.example.barberIO.dtos.AgendamentoRecordDto;
import com.example.barberIO.models.AgendamentoModel;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.repositories.AgendamentoRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.services.AgendamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.swing.text.html.Option;
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
}
