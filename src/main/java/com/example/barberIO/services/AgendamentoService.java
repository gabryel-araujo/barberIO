package com.example.barberIO.services;

import com.example.barberIO.dtos.AgendamentoRecordDto;
import com.example.barberIO.dtos.ResponseAgendamentoRecordDto;
import com.example.barberIO.enums.TipoAgendamento;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.AgendamentoModel;
import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.models.ServiceModel;
import com.example.barberIO.repositories.AgendamentoRepository;
import com.example.barberIO.repositories.ClienteRepository;
import com.example.barberIO.repositories.EmpresaRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.repositories.HorarioFuncionamentoRepository;
import com.example.barberIO.repositories.ServiceRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.example.barberIO.enums.TipoAgendamento.*;

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

    @Autowired
    private EmpresaRepository empresaRepository;

    @Autowired
    private HorarioFuncionamentoRepository horarioFuncionamentoRepository;


    public ResponseEntity<Object> agendarHorario(AgendamentoRecordDto agendamentoRecordDto, Long empresaId) {
        Optional<FuncionarioModel> funcionarioO = funcionarioRepository
                .findById(agendamentoRecordDto.barbeiro().getId());
        Optional<ClienteModel> clienteO = clienteRepository.findById(agendamentoRecordDto.cliente().getId());
        Optional<ServiceModel> servicoO = serviceRepository.findById(agendamentoRecordDto.servico().getId());
        Optional<EmpresaModel> empresaO = empresaRepository.findById(empresaId);

        if (funcionarioO.isEmpty() || clienteO.isEmpty() || servicoO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Dados inválidos para a requisição. Cliente, Serviço ou Barbeiro inválidos");
        }

        FuncionarioModel barbeiro = funcionarioO.get();
        ServiceModel servico = servicoO.get();
        ClienteModel cliente = clienteO.get();
        EmpresaModel empresa = empresaO.get();

        LocalDateTime horarioAgendamento = agendamentoRecordDto.horario();
        LocalDateTime fimAgendamento = horarioAgendamento.plusMinutes(servico.getDuracao());

        boolean barbeiroOcupado = agendamentoRepository.barbeiroOcupado(barbeiro.getId(), horarioAgendamento,
                fimAgendamento);

        if (barbeiroOcupado) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("O barbeiro está ocupado no horário solicitado");
        } else {
            AgendamentoModel agendamentoModel = new AgendamentoModel();
            BeanUtils.copyProperties(agendamentoRecordDto, agendamentoModel);

            agendamentoModel.setBarbeiro(barbeiro);
            agendamentoModel.setCliente(cliente);
            agendamentoModel.setServico(servico);
            agendamentoModel.setHorario(horarioAgendamento);
            agendamentoModel.setFim(fimAgendamento);
            agendamentoModel.setFim(agendamentoModel.getFim());
            agendamentoModel.setEmpresa(empresa);
            agendamentoModel.setStatus(ATIVO);

            return ResponseEntity.status(HttpStatus.CREATED).body(agendamentoRepository.save(agendamentoModel));
        }

    }

    public ResponseEntity<Object> cancelarHorario(Long id) {
        Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

        if (agendamentoO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não localizado! Verifique os dados");
        }

        AgendamentoModel agendamentoModel = agendamentoO.get();
        agendamentoModel.setStatus(CANCELADO);
        agendamentoRepository.save(agendamentoModel);

        return ResponseEntity.status(HttpStatus.OK).body("Agendamento cancelado com sucesso!");
    }

    public ResponseEntity<Object> reativarHorario(Long id) {
        Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

        if (agendamentoO.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Agendamento não localizado! Verifique os dados");
        }

        AgendamentoModel agendamentoModel = agendamentoO.get();
        agendamentoModel.setStatus(ATIVO);
        agendamentoRepository.save(agendamentoModel);

        return ResponseEntity.status(HttpStatus.OK).body("Agendamento reativado com sucesso!");
    }

    public ResponseEntity<Object> editarAgendamento(AgendamentoRecordDto agendamentoRecordDto, Long id) {
        this.cancelarHorario(id);

        return this.agendarHorario(agendamentoRecordDto, agendamentoRecordDto.empresa_id());
    }

    public ResponseEntity<Object> horarioDisponivel(LocalDateTime data, Long barbeiroId, int intervalo) {
        boolean barbeiroOcupado = agendamentoRepository.barbeiroOcupado(barbeiroId, data, data.plusMinutes(intervalo));

        if (barbeiroOcupado) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("O barbeiro está ocupado no horário solicitado");
        }
        return ResponseEntity.status(HttpStatus.OK).body("barbeiro disponível");
    }

    public List<LocalTime> horariosDisponiveis(Long barbeiroId, LocalDate dia, Long empresa_id) {
        Optional<EmpresaModel> empresaO = empresaRepository.findById(empresa_id);

        if (empresaO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Empresa não localizada! Verifique os dados");
        }

        EmpresaModel empresa = empresaO.get();
        FuncionarioModel funcionario = funcionarioRepository.findById(barbeiroId).get();

        ZoneId zone = ZoneId.of("America/Sao_Paulo");
        LocalDate hoje = LocalDate.now(zone);
        LocalTime agora = LocalTime.now(zone);
        Duration intervalo = Duration.ofMinutes(empresa.getConfig_empresa().getIntervalo());
        LocalTime abertura = horarioFuncionamentoRepository.verificarAbertura(dia.getDayOfWeek().getValue(),empresa_id);
        LocalTime fechamento = horarioFuncionamentoRepository.verificarFechamento(dia.getDayOfWeek().getValue(),empresa_id);
        LocalDateTime fechamento_ini = funcionario.getFechamento_ini();
        LocalDateTime fechamento_fim = funcionario.getFechamento_fim();
        boolean disponivel = true;

        if (abertura == null || fechamento == null) {
            throw new RuntimeException("Não é possível agendar: a empresa está fechada no dia e horário selecionado.");
        }

        List<Object[]> agendamentosBrutos = agendamentoRepository.findAgendamentosComDuracao(barbeiroId, dia);

        List<LocalTime[]> periodosOcupados = agendamentosBrutos.stream().map(obj -> {
            LocalDateTime inicioAg = ((Timestamp) obj[0]).toLocalDateTime();
            int duracao = ((Number) obj[1]).intValue();
            LocalTime inicioLocal = inicioAg.toLocalTime();
            LocalTime fimLocal = inicioLocal.plusMinutes(duracao);
            return new LocalTime[]{inicioLocal, fimLocal};
        }).collect(Collectors.toList());

        List<LocalTime> horariosDisponiveis = new ArrayList<>();

        for (LocalTime h = abertura; h.isBefore(fechamento); h = h.plus(intervalo)) {
            final LocalTime horario = h;

            if (dia.isEqual(hoje) && horario.isBefore(agora)) {
                continue;
            }

            boolean ocupado = periodosOcupados.stream()
                    .anyMatch(periodo -> !horario.isBefore(periodo[0]) && horario.isBefore(periodo[1]));

            if(fechamento_ini != null && fechamento_fim != null) {
                if(fechamento_ini.getDayOfWeek() == dia.getDayOfWeek()) {
                    disponivel = horario.isBefore(LocalTime.from(fechamento_ini)) || horario.isAfter(LocalTime.from(fechamento_fim));
                }
            }

            if (!ocupado && disponivel) {
                horariosDisponiveis.add(horario);
            }
        }

        return horariosDisponiveis;
    }
    
    public ResponseEntity<List<ResponseAgendamentoRecordDto>> listarAgendamentosMinificado(Long barbeiro_id) {
    	List<AgendamentoModel> agendamentos = agendamentoRepository.findAllByEmpresaId(barbeiro_id);
    	
    	List<ResponseAgendamentoRecordDto> dtos = agendamentos.stream().map(agendamento -> 
        new ResponseAgendamentoRecordDto(
            agendamento.getId(),
            agendamento.getHorario(),
            agendamento.getFim(),
            agendamento.getBarbeiro().getNome(),
            agendamento.getCliente().getNome(),
            agendamento.getCliente().getTelefone(),
            agendamento.getServico().getNome(),
            agendamento.getServico().getPreco(),
            agendamento.getStatus()
        )
    ).toList();
    	return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

    public ResponseEntity<AgendamentoModel> concluirAgendamento(Long id){
        try{
            Optional<AgendamentoModel> agendamentoO = agendamentoRepository.findById(id);

            if(agendamentoO.isEmpty()){
                throw new RecursoNaoEncontradoException("Agendamento não localizado, Verifique os dados");
            }
            AgendamentoModel agendamento = agendamentoO.get();

            agendamento.setStatus(CONCLUIDO);

            return ResponseEntity.status(HttpStatus.OK).body(agendamentoRepository.save(agendamento));

        }catch(Exception ex){
            throw new RuntimeException(ex);
        }
    }

}
