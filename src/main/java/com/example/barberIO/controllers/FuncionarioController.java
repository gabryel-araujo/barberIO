package com.example.barberIO.controllers;

import com.example.barberIO.dtos.FuncionarioPublicoRecordDto;
import com.example.barberIO.dtos.FuncionarioRecordDto;
import com.example.barberIO.dtos.ResponseAgendamentoRecordDto;
import com.example.barberIO.enums.TipoFuncionario;
import com.example.barberIO.exceptions.RecursoDuplicadoException;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.models.ServiceModel;
import com.example.barberIO.repositories.EmpresaRepository;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.repositories.ServiceRepository;
import com.example.barberIO.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.*;

import static com.example.barberIO.enums.TipoFuncionario.BARBEIRO;

@RestController
@RequestMapping
public class FuncionarioController {
	@Autowired
	FuncionarioRepository funcionarioRepository;
	@Autowired
	private ServiceRepository serviceRepository;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private JwtUtil jwtUtil;
    @Autowired
    private EmpresaRepository empresaRepository;

	@GetMapping("/funcionarios")
	public ResponseEntity<List<FuncionarioModel>> getAll( HttpServletRequest req) {
		String authHeader = req.getHeader("Authorization");
		String token = authHeader.substring(7);
		String usuarioLogado = jwtUtil.extractUsername(token);
		EmpresaModel empresaLogada = funcionarioRepository.findByEmail(usuarioLogado).get().getEmpresa();

		return ResponseEntity.status(HttpStatus.OK).body(funcionarioRepository.findAllByEmpresaId(empresaLogada.getId()));
	}

	@GetMapping("/public/funcionarios/{empresa_id}")
    public ResponseEntity<List<FuncionarioPublicoRecordDto>> listarFuncionariosPublicos(@PathVariable Long empresa_id) {
    	List<FuncionarioModel> funcionarios = funcionarioRepository.findAllByEmpresaId(empresa_id);
    	
    	List<FuncionarioPublicoRecordDto> dtos = funcionarios.stream().map(funcionario -> 
        new FuncionarioPublicoRecordDto(
        		funcionario.getId(),
        		funcionario.getNome(),
        		funcionario.getAvaliacao(),
        		funcionario.getExperiencia(),
        		funcionario.getAtendimentos(),
        		funcionario.isDisponivel(),
        		funcionario.getServicos(),
        		funcionario.isAtivo(),
				funcionario.getAvatar(),
                funcionario.getEmail()
    )).toList();
        return ResponseEntity.status(HttpStatus.OK).body(dtos);
    }

	@GetMapping("/funcionarios/{id}")
	public ResponseEntity<Object> getById(@PathVariable(value = "id") Long id) {
		Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);

		if (funcionarioO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não encontrado na base de dados");
		}

		return ResponseEntity.status(HttpStatus.OK).body(funcionarioO.get());
	}

	@PostMapping("/funcionarios")
	public ResponseEntity<FuncionarioModel> addFuncionario(
			@RequestBody @Valid FuncionarioRecordDto funcionarioRecordDto, HttpServletRequest req) {
		try {
			Optional<FuncionarioModel> funcionario = funcionarioRepository.findByEmail(funcionarioRecordDto.email());
			if (funcionario.isPresent()) {
				throw new RecursoDuplicadoException("Já existe um usuário cadastrado com o e-mail informado");
			}
			String authHeader = req.getHeader("Authorization");
			String token = authHeader.substring(7);
			String usuarioLogado = jwtUtil.extractUsername(token);
			EmpresaModel empresaLogada = funcionarioRepository.findByEmail(usuarioLogado).get().getEmpresa();

			FuncionarioModel funcionarioModel = new FuncionarioModel();
			LocalDateTime now = LocalDateTime.now();
			BeanUtils.copyProperties(funcionarioRecordDto, funcionarioModel);
			funcionarioModel.setAtivo(true);
			funcionarioModel.setSenha(encoder.encode(funcionarioModel.getSenha()));
			funcionarioModel.setCreated_at(now);
			if(funcionarioRecordDto.tipo() == null){
				funcionarioModel.setTipo(BARBEIRO);
			}else{
				funcionarioModel.setTipo(funcionarioRecordDto.tipo());
			}
			if(funcionarioRecordDto.empresa_id() == null){
				funcionarioModel.setEmpresa(empresaLogada);
			}else{
				EmpresaModel empresaNova = empresaRepository.findById(funcionarioRecordDto.empresa_id()).get();
				funcionarioModel.setEmpresa(empresaNova);
			}
			FuncionarioModel salvo = funcionarioRepository.save(funcionarioModel);

			String[] servicosArray = funcionarioRecordDto.newServices();

			if (servicosArray != null) {
				for (String s : servicosArray) {
					try {
						this.adicionarServicoAux(salvo.getId(), Long.parseLong(s));
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

			return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
		} catch (Exception e) {
			System.err.println("Erro no processamento: " + e.getMessage());
			e.printStackTrace();
			throw new RuntimeException("Erro ao processar os dados. Verifique informações");
		}
	}

	@PutMapping("/funcionarios/{id}")
	public ResponseEntity<FuncionarioModel> updateFuncionario(@PathVariable(value = "id") Long id,
															  @RequestBody @Valid FuncionarioRecordDto funcionarioRecordDto) {

		FuncionarioModel funcionarioModel = funcionarioRepository.findById(id)
				.orElseThrow(() -> new RecursoNaoEncontradoException("Funcionário não encontrado na base de dados."));

		String senhaAtual = funcionarioModel.getSenha();

		BeanUtils.copyProperties(funcionarioRecordDto, funcionarioModel);

		if (funcionarioRecordDto.senha() != null && !funcionarioRecordDto.senha().isBlank()) {
			if (!funcionarioRecordDto.senha().equals(senhaAtual)) {
				funcionarioModel.setSenha(encoder.encode(funcionarioRecordDto.senha()));
			} else {
				funcionarioModel.setSenha(senhaAtual);
			}
		}

		return ResponseEntity.status(HttpStatus.OK).body(funcionarioRepository.save(funcionarioModel));
	}

	@DeleteMapping("/funcionarios/{id}")
	public ResponseEntity<Object> deleteFuncionario(@PathVariable(value = "id") Long id) {
		Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);

		if (funcionarioO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário não encontrado.");
		}

		funcionarioRepository.delete(funcionarioO.get());
		return ResponseEntity.status(HttpStatus.OK).body("Funcionário deletado com sucesso!");
	}

	@PatchMapping("/funcionarios/{id}/adicionarServico/{servicoId}")
	public ResponseEntity<Object> adicionarServico(@PathVariable(value = "id") Long id,
			@PathVariable(value = "servicoId") Long servicoId) {
		Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);
		Optional<ServiceModel> serviceO = serviceRepository.findById(servicoId);

		if (funcionarioO.isEmpty() || serviceO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário ou serviço não encontrados!");
		}

		FuncionarioModel funcionarioModel = funcionarioO.get();
		ServiceModel serviceModel = serviceO.get();

		boolean servicoAdicionado = funcionarioModel.getServicos().stream()
				.anyMatch(s -> s.getId().equals(serviceModel.getId()));

		if (servicoAdicionado) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Serviço já adicionado!");
		}

		funcionarioModel.getServicos().add(serviceModel);
		funcionarioRepository.save(funcionarioModel);

		return ResponseEntity.status(HttpStatus.OK).body(funcionarioModel);

	}

	@PatchMapping("/funcionarios/{id}/removerServico/{servicoId}")
	public ResponseEntity<Object> removerServico(@PathVariable(value = "id") Long id,
			@PathVariable(value = "servicoId") Long servicoId) {
		Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);
		Optional<ServiceModel> servicoO = serviceRepository.findById(servicoId);

		if (funcionarioO.isEmpty() || servicoO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Funcionário ou serviço não encontrados!");
		}

		FuncionarioModel funcionario = funcionarioO.get();
		ServiceModel servico = servicoO.get();

		funcionario.getServicos().removeIf(s -> s.getId().equals(servico.getId()));
		funcionarioRepository.save(funcionario);

		return ResponseEntity.status(HttpStatus.OK).body(funcionario);

	}

	public void adicionarServicoAux(Long id, Long servicoId) {
		Optional<FuncionarioModel> funcionarioO = funcionarioRepository.findById(id);
		Optional<ServiceModel> serviceO = serviceRepository.findById(servicoId);

		if (funcionarioO.isEmpty()) {
			throw new RuntimeException("Funcionário com ID " + id + " não encontrado!");
			// Considere usar exceções mais específicas, como EntityNotFoundException
		}
		if (serviceO.isEmpty()) {
			throw new RuntimeException("Serviço com ID " + servicoId + " não encontrado!");
		}

		FuncionarioModel funcionarioModel = funcionarioO.get();
		ServiceModel serviceModel = serviceO.get();

		if (funcionarioModel.getServicos() != null) {
			boolean servicoAdicionado = funcionarioModel.getServicos().stream()
					.anyMatch(s -> s.getId().equals(serviceModel.getId()));

			if (servicoAdicionado) {
				throw new RuntimeException("Serviço já adicionado");
			}
		}

		funcionarioModel.getServicos().add(serviceModel);
		funcionarioRepository.save(funcionarioModel);

	}
}
