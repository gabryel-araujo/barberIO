package com.example.barberIO.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import com.example.barberIO.exceptions.DadosVioladosException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.barberIO.dtos.ConfigEmpresaRecordDto;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ConfigEmpresaModel;
import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.repositories.ConfigEmpresaRepository;
import com.example.barberIO.repositories.EmpresaRepository;

@Service
public class ConfigEmpresaService {

    @Autowired
    private ConfigEmpresaRepository configEmpresaRepository;

    @Autowired
    private EmpresaRepository empresaRepository;

    public ResponseEntity<List<ConfigEmpresaModel>> listarConfiguracoes() {
        List<ConfigEmpresaModel> configuracoes = configEmpresaRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(configuracoes);
    }

    public ResponseEntity<List<ConfigEmpresaModel>> listarConfiguracoesPorEmpresa(Long empresa_id) {
        List<ConfigEmpresaModel> configuracoes = configEmpresaRepository.listarConfigsPorEmpresa(empresa_id);

        if (configuracoes.isEmpty()) {
            throw new RecursoNaoEncontradoException("Nenhuma configuração localizada para essa empresa");
        }

        return ResponseEntity.status(HttpStatus.OK).body(configuracoes);
    }

    public ResponseEntity<ConfigEmpresaModel> cadastrarConfiguracao(ConfigEmpresaRecordDto configDto, Long empresa_id) {
        Optional<EmpresaModel> empresaO = empresaRepository.findById(empresa_id);

        if (empresaO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Empresa não localizada na base de dados");
        }

        ConfigEmpresaModel configEmpresa = new ConfigEmpresaModel();
        BeanUtils.copyProperties(configDto, configEmpresa);
        LocalDateTime now = LocalDateTime.now();
        configEmpresa.setConfig_empresa(empresaO.get());
        configEmpresa.setUltima_alteracao(now);

        return ResponseEntity.status(HttpStatus.CREATED).body(configEmpresaRepository.save(configEmpresa));
    }

    public ResponseEntity<ConfigEmpresaModel> editarConfiguracao(ConfigEmpresaRecordDto configDto, Long empresa_id, Long config_id) {
        Optional<EmpresaModel> empresaO = empresaRepository.findById(empresa_id);

        if (empresaO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Empresa não localizada na base de dados");
        }

        Optional<ConfigEmpresaModel> configEmpresaO = configEmpresaRepository.findById(config_id);

        if (configEmpresaO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Configuração não localizada. Verifique os dados");
        }

        ConfigEmpresaModel configEmpresaModel = configEmpresaO.get();
        BeanUtils.copyProperties(configDto, configEmpresaModel);
        configEmpresaModel.setUltima_alteracao(LocalDateTime.now());
        configEmpresaRepository.save(configEmpresaModel);

        return ResponseEntity.status(HttpStatus.OK).body(configEmpresaModel);
    }

    public ResponseEntity<Object> removerConfiguracao(Long config_id) {
        Optional<ConfigEmpresaModel> configO = configEmpresaRepository.findById(config_id);

        if (configO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Configuração não localizada. Verifique os dados");
        }

        ConfigEmpresaModel configEmpresaModel = configO.get();

        // Desvincular da empresa antes de remover
        EmpresaModel empresa = configEmpresaModel.getConfig_empresa();
        if (empresa != null) {
            empresa.setConfig_empresa(null); // zera a referência da empresa para a config
            empresaRepository.save(empresa); // salva a mudança
        }

        configEmpresaRepository.delete(configEmpresaModel);
        return ResponseEntity.status(HttpStatus.OK).body("Configuração removida com sucesso");
    }
}
