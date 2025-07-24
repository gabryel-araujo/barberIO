package com.example.barberIO.services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.barberIO.dtos.HorarioFuncionamentoRecordDto;
import com.example.barberIO.exceptions.DadosVioladosException;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ConfigEmpresaModel;
import com.example.barberIO.models.HorarioFuncionamentoModel;
import com.example.barberIO.repositories.ConfigEmpresaRepository;
import com.example.barberIO.repositories.HorarioFuncionamentoRepository;
import org.springframework.stereotype.Service;

@Service
public class HorarioFuncionamentoService {

	@Autowired
	private HorarioFuncionamentoRepository horarioFuncionamentoRepository;

	@Autowired
	private ConfigEmpresaRepository configEmpresaRepository;

	public ResponseEntity<List<HorarioFuncionamentoModel>> listarHorariosFunc() {
		List<HorarioFuncionamentoModel> horarios = horarioFuncionamentoRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));

		if (horarios.isEmpty()) {
			throw new RecursoNaoEncontradoException("Esta organização ainda não possui horários cadastrados. Por favor, configure os horários de atendimento.");
		}

		return ResponseEntity.status(HttpStatus.OK).body(horarios);
	}

	public ResponseEntity<List<HorarioFuncionamentoModel>> listarHorariosFuncPorEmpresa(Long config_empresa_id) {
		List<HorarioFuncionamentoModel> horarios = horarioFuncionamentoRepository.findAllByEmpresa(config_empresa_id);

		if (horarios.isEmpty()) {
			throw new RecursoNaoEncontradoException("Esta empresa ainda não possui horários cadastrados. Por favor, configure os horários de atendimento.");
		}

		return ResponseEntity.status(HttpStatus.OK).body(horarios);
	}

	public ResponseEntity<HorarioFuncionamentoModel> cadastrarHorario(
			HorarioFuncionamentoRecordDto horarioFuncionamento, Long config_empresa_id) {
		Optional<ConfigEmpresaModel> configO = configEmpresaRepository.findById(config_empresa_id);

		if (configO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Parâmetros de configuração não localizados! Verifique informações");
		}

		List<HorarioFuncionamentoModel> horarios = horarioFuncionamentoRepository.findAllByEmpresa(config_empresa_id);

		if (horarios.size() == 7) {
			throw new DadosVioladosException("Não é possível cadastrar outro horário de funcionamento. O limite de dias da semana já foi atingido.");
		}

		int codigo_dia = horarios.size() + 1;

		HorarioFuncionamentoModel horarioNew = new HorarioFuncionamentoModel();
		BeanUtils.copyProperties(horarioFuncionamento, horarioNew);
		horarioNew.setUltima_alteracao(LocalDateTime.now());
		horarioNew.setConfig_empresa(configO.get());
		horarioNew.setCodigo_dia(codigo_dia);
		return ResponseEntity.status(HttpStatus.CREATED).body(horarioFuncionamentoRepository.save(horarioNew));
	}

	public ResponseEntity<List<HorarioFuncionamentoModel>> cadastrarVariosHorarios(List<HorarioFuncionamentoRecordDto> horarioFuncionamento, Long config_empresa_id){
		Optional<ConfigEmpresaModel> configO = configEmpresaRepository.findById(config_empresa_id);

		if (configO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Parâmetros de configuração não localizados! Verifique informações");
		}

		List<HorarioFuncionamentoModel> horarios = horarioFuncionamentoRepository.findAllByEmpresa(config_empresa_id);

		if (horarios.size() == 7) {
			throw new DadosVioladosException("Não é possível cadastrar outro horário de funcionamento. O limite de dias da semana já foi atingido.");
		}

		List<HorarioFuncionamentoModel> horariosNew = new ArrayList<>();

		for (HorarioFuncionamentoRecordDto horario : horarioFuncionamento) {
			HorarioFuncionamentoModel horarioNew = new HorarioFuncionamentoModel();

			BeanUtils.copyProperties(horario, horarioNew);

			horarioNew.setUltima_alteracao(LocalDateTime.now());
			horarioNew.setConfig_empresa(configO.get());
			horarioNew.setCodigo_dia(horario.codigo_dia());

			horariosNew.add(horarioNew);
		}

		horarioFuncionamentoRepository.saveAll(horariosNew);

		return ResponseEntity.status(HttpStatus.CREATED).body(horariosNew);
	}

	public ResponseEntity<HorarioFuncionamentoModel> editarHorario(HorarioFuncionamentoRecordDto horarioFuncionamentoDto, Long horario_func_id) {
		Optional<HorarioFuncionamentoModel> horarioFuncO = horarioFuncionamentoRepository.findById(horario_func_id);

		if(horarioFuncO.isEmpty()){
			throw new RecursoNaoEncontradoException("Parâmetro de horário inválido. Verifique os dados");
		}

		HorarioFuncionamentoModel newHorario = horarioFuncO.get();
		BeanUtils.copyProperties(horarioFuncionamentoDto,newHorario);
		newHorario.setUltima_alteracao(LocalDateTime.now());
		horarioFuncionamentoRepository.save(newHorario);
		return ResponseEntity.status(HttpStatus.OK).body(newHorario);
	}

	public ResponseEntity<List<HorarioFuncionamentoModel>> editarVariosHorarios(
			List<HorarioFuncionamentoRecordDto> horarioFuncionamento,
			Long config_empresa_id) {

		Optional<ConfigEmpresaModel> configO = configEmpresaRepository.findById(config_empresa_id);

		if (configO.isEmpty()) {
			throw new RecursoNaoEncontradoException("Parâmetros de configuração não localizados! Verifique informações");
		}

		List<HorarioFuncionamentoModel> horariosExistentes = horarioFuncionamentoRepository.findAllByEmpresa(config_empresa_id);

		if (horariosExistentes.size() != 7) {
			throw new DadosVioladosException("É necessário que os 7 dias da semana já estejam cadastrados para poder editar.");
		}

		// Corrigido aqui: tratamento de duplicatas
		Map<Integer, HorarioFuncionamentoModel> mapaHorarios = horariosExistentes.stream()
				.collect(Collectors.toMap(
						HorarioFuncionamentoModel::getCodigo_dia,
						h -> h,
						(h1, h2) -> h1 // mantém o primeiro em caso de duplicata
				));

		List<HorarioFuncionamentoModel> horariosEditados = new ArrayList<>();

		for (HorarioFuncionamentoRecordDto dto : horarioFuncionamento) {
			HorarioFuncionamentoModel horario = mapaHorarios.get(dto.codigo_dia());

			if (horario == null) {
				throw new DadosVioladosException("Não foi encontrado o dia com código " + dto.codigo_dia());
			}

			BeanUtils.copyProperties(dto, horario);
			horario.setUltima_alteracao(LocalDateTime.now());
			horariosEditados.add(horario);
		}

		horarioFuncionamentoRepository.saveAll(horariosEditados);

		return ResponseEntity.ok(horariosEditados);
	}


	public ResponseEntity<Object> excluirHorario(Long horario_func_id){
		Optional<HorarioFuncionamentoModel> horarioFuncO = horarioFuncionamentoRepository.findById(horario_func_id);

		if(horarioFuncO.isEmpty()){
			throw new RecursoNaoEncontradoException("Parâmetro de horário inválido. Verifique os dados");
		}

		horarioFuncionamentoRepository.delete(horarioFuncO.get());
		return ResponseEntity.status(HttpStatus.OK).body("Horário removido com sucesso!");
	}
}
