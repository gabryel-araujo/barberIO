package com.example.barberIO.services;

import com.example.barberIO.dtos.FeriadoRecordDto;
import com.example.barberIO.exceptions.DadosVioladosException;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ConfigEmpresaModel;
import com.example.barberIO.models.FeriadoModel;
import com.example.barberIO.repositories.ConfigEmpresaRepository;
import com.example.barberIO.repositories.FeriadoRepository;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeriadoService {

    @Autowired
    private FeriadoRepository feriadoRepository;

    @Autowired
    private ConfigEmpresaRepository configEmpresaRepository;

    public ResponseEntity<List<FeriadoModel>> listarFeriados() {
        List<FeriadoModel> feriados = feriadoRepository.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(feriados);
    }

    public ResponseEntity<List<FeriadoModel>> listarPorConfigEmpresa(Long configEmpresaId) {
        List<FeriadoModel> feriados = feriadoRepository.findAllByEmpresa(configEmpresaId);

        if (feriados.isEmpty()) {
            throw new RecursoNaoEncontradoException("Nenhum feriado cadastrado para essa configuração de empresa.");
        }

        return ResponseEntity.status(HttpStatus.OK).body(feriados);
    }

    public ResponseEntity<FeriadoModel> cadastrarFeriado(FeriadoRecordDto dto, Long configEmpresaId) {
        Optional<ConfigEmpresaModel> configO = configEmpresaRepository.findById(configEmpresaId);

        if (configO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Configuração da empresa não localizada.");
        }

        FeriadoModel feriado = new FeriadoModel();
        BeanUtils.copyProperties(dto, feriado);
        feriado.setConfig_empresa(configO.get());

        return ResponseEntity.status(HttpStatus.CREATED).body(feriadoRepository.save(feriado));
    }

    public ResponseEntity<FeriadoModel> editarFeriado(FeriadoRecordDto dto, Long feriadoId) {
        Optional<FeriadoModel> feriadoO = feriadoRepository.findById(feriadoId);

        if (feriadoO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Feriado não localizado.");
        }

        FeriadoModel feriado = feriadoO.get();
        BeanUtils.copyProperties(dto, feriado, "id", "config_empresa");
        return ResponseEntity.status(HttpStatus.OK).body(feriadoRepository.save(feriado));
    }

    public ResponseEntity<Object> removerFeriado(Long feriadoId) {
        Optional<FeriadoModel> feriadoO = feriadoRepository.findById(feriadoId);

        if (feriadoO.isEmpty()) {
            throw new RecursoNaoEncontradoException("Feriado não encontrado.");
        }

        feriadoRepository.delete(feriadoO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Feriado removido com sucesso.");
    }
}
