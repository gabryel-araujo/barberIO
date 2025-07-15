package com.example.barberIO.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;

import com.example.barberIO.dtos.HorarioFuncionamentoRecordDto;
import com.example.barberIO.exceptions.DadosVioladosException;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ConfigEmpresaModel;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.models.HorarioFuncionamentoModel;
import com.example.barberIO.repositories.ConfigEmpresaRepository;
import com.example.barberIO.repositories.EmpresaRepository;
import com.example.barberIO.repositories.HorarioFuncionamentoRepository;

public class HorarioFuncionamentoService {

	@Autowired
	private HorarioFuncionamentoRepository horarioFuncionamentoRepository;

//	@Autowired
//	private EmpresaRepository empresaRepository;

	@Autowired
	private ConfigEmpresaRepository configEmpresaRepository;

	public ResponseEntity<List<HorarioFuncionamentoModel>> listarHorariosFunc() {
		List<HorarioFuncionamentoModel> horarios = horarioFuncionamentoRepository.findAll();

		if (horarios.isEmpty()) {
			throw new RecursoNaoEncontradoException("Nenhum horário cadastrado na base de dados");
		}

		return ResponseEntity.status(HttpStatus.OK).body(horarios);
	}

	public ResponseEntity<List<HorarioFuncionamentoModel>> listarHorariosFuncPorEmpresa(Long config_empresa_id) {
		List<HorarioFuncionamentoModel> horarios = horarioFuncionamentoRepository.findAllByEmpresa(config_empresa_id);

		if (horarios.isEmpty()) {
			throw new RecursoNaoEncontradoException("Nenhum horário cadastrado na base de dados");
		}

		return ResponseEntity.status(HttpStatus.OK).body(horarios);
	}

	public ResponseEntity<HorarioFuncionamentoModel> cadastrarHorario(
			HorarioFuncionamentoRecordDto horarioFuncionamento, Long config_empresa_id) {
		Optional<ConfigEmpresaModel> configO = configEmpresaRepository.findById(config_empresa_id);

		if (configO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Dados de configuração não localizados! Verifique informações");
		}

		List<HorarioFuncionamentoModel> horarios = horarioFuncionamentoRepository.findAllByEmpresa(config_empresa_id);

		if (horarios.size() == 7) {
			throw new DadosVioladosException("Não é possível cadastrar mais um horário para os dias da semana");
		}

		HorarioFuncionamentoModel horarioNew = new HorarioFuncionamentoModel();
		BeanUtils.copyProperties(horarioFuncionamento, horarioNew);
		horarioNew.setUltima_alteracao(LocalDateTime.now());
		horarioNew.setConfig_empresa(configO.get());
		return ResponseEntity.status(HttpStatus.CREATED).body(horarioFuncionamentoRepository.save(horarioNew));
	}

	public ReponseEntity<HorarioFuncionamentoModel> editarHorario(HorarioFuncionamentoRecordDto horarioFuncionamento,
			Long config_empresa_id) {

	}
}
