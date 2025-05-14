package com.example.barberIO.services;

import com.example.barberIO.controllers.AgendamentoController;
import com.example.barberIO.controllers.ServiceController;
import com.example.barberIO.dtos.AgendamentoRecordDto;
import com.example.barberIO.models.AgendamentoModel;
import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.models.ServiceModel;
import com.example.barberIO.repositories.AgendamentoRepository;
import com.example.barberIO.repositories.ClienteRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.repositories.ServiceRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AgendamentoService {

    @Autowired
    private AgendamentoRepository agendamentoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ServiceRepository serviceRepository;


    public ResponseEntity<Object> agendarHorario(AgendamentoRecordDto agendamentoRecordDto){
        Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(agendamentoRecordDto.barbeiro().getId());
        Optional<ClienteModel> clienteO = clienteRepository.findById(agendamentoRecordDto.cliente().getId());
        Optional<ServiceModel> servicoO = serviceRepository.findById(agendamentoRecordDto.servico().getId());

        if(funcionarioO.isEmpty() || clienteO.isEmpty() || servicoO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dados inválidos para a requisição. Cliente, Serviço ou Barbeiro inválidos");
        }

        FuncionarioModel barbeiro = funcionarioO.get();
        ServiceModel servico = servicoO.get();
        ClienteModel cliente = clienteO.get();

        LocalDateTime horarioAgendamento = agendamentoRecordDto.horario();
        LocalDateTime fimAgendamento = horarioAgendamento.plusMinutes(servico.getDuracao());

        boolean barbeiroOcupado = agendamentoRepository.barbeiroOcupado(barbeiro.getId(),horarioAgendamento, fimAgendamento);

        if(barbeiroOcupado){
            return ResponseEntity.status(HttpStatus.CONFLICT).body("O barbeiro está ocupado no horário solicitado");
        }
        else {
            AgendamentoModel agendamentoModel = new AgendamentoModel();
            BeanUtils.copyProperties(agendamentoRecordDto, agendamentoModel);

            agendamentoModel.setBarbeiro(barbeiro);
            agendamentoModel.setCliente(cliente);
            agendamentoModel.setServico(servico);
            agendamentoModel.setHorario(horarioAgendamento);
            agendamentoModel.setFim(fimAgendamento);
            agendamentoModel.setFim(agendamentoModel.getFim());

            return ResponseEntity.status(HttpStatus.CREATED).body(agendamentoRepository.save(agendamentoModel));
        }

    }

    public ResponseEntity<Object> cancelarHorario(Long id) {
        Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

        if(agendamentoO.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não localizado! Verifique os dados");
        }

        agendamentoRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.OK).body("Agendamento removido com sucesso!");
    }

    public ResponseEntity<Object> editarAgendamento(AgendamentoRecordDto agendamentoRecordDto, Long id){
       this.cancelarHorario(id);

       return this.agendarHorario(agendamentoRecordDto);
    }

    public ResponseEntity<Object> horarioDisponivel(LocalDateTime data, Long barbeiroId, int intervalo){
    boolean barbeiroOcupado = agendamentoRepository.barbeiroOcupado(barbeiroId,data,data.plusMinutes(intervalo));

    if(barbeiroOcupado){
        return ResponseEntity.status(HttpStatus.CONFLICT).body("O barbeiro está ocupado nesse horário");
    }
        return ResponseEntity.status(HttpStatus.OK).body("barbeiro disponível");
    }


}
