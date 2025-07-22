package com.example.barberIO.controllers;

import com.example.barberIO.dtos.HorarioFuncionamentoRecordDto;
import com.example.barberIO.models.HorarioFuncionamentoModel;
import com.example.barberIO.services.HorarioFuncionamentoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class HorarioFuncionamentoController {

    @Autowired
    private HorarioFuncionamentoService horarioFuncionamentoService;

    @GetMapping("/horarioFuncionamento")
    public ResponseEntity<List<HorarioFuncionamentoModel>> listarHorarios(){
        return horarioFuncionamentoService.listarHorariosFunc();
    }

    @GetMapping("/horarioFuncionamento/{empresa_id}")
    public ResponseEntity<List<HorarioFuncionamentoModel>> listarHorariosPorEmpresa(@PathVariable(name = "empresa_id") Long empresa_id){
        return horarioFuncionamentoService.listarHorariosFuncPorEmpresa(empresa_id);
    }

    @PostMapping("/horarioFuncionamento/{config_empresa_id}")
    public ResponseEntity<HorarioFuncionamentoModel> cadastrarHorario(@RequestBody @Valid HorarioFuncionamentoRecordDto horarioFuncionamentoRecordDto, @PathVariable(name = "config_empresa_id")Long config_empresa_id){
        return horarioFuncionamentoService.cadastrarHorario(horarioFuncionamentoRecordDto,config_empresa_id);
    }

    @PostMapping("/horarioFuncionamento/semana/{config_empresa_id}")
    public ResponseEntity<List<HorarioFuncionamentoModel>> cadastrarVariosHorarios(@RequestBody @Valid List<HorarioFuncionamentoRecordDto> horarioFuncionamentoRecordDto, @PathVariable(name = "config_empresa_id")Long config_empresa_id){
        return horarioFuncionamentoService.cadastrarVariosHorarios(horarioFuncionamentoRecordDto,config_empresa_id);
    }

    @PutMapping("/horarioFuncionamento/{id}")
    public ResponseEntity<HorarioFuncionamentoModel> editarHorario(@RequestBody @Valid HorarioFuncionamentoRecordDto horarioFuncionamentoRecordDto, @PathVariable(name = "id")Long id){
        return horarioFuncionamentoService.editarHorario(horarioFuncionamentoRecordDto,id);
    }

    @DeleteMapping("/horarioFuncionamento/{id}")
    public ResponseEntity<Object> excluirHorario(@PathVariable(name = "id")Long id){
        return horarioFuncionamentoService.excluirHorario(id);
    }

}
