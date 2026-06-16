package com.example.barberIO.services;

import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.repositories.ClienteRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ClienteService extends EmpresaAwareServiceImpl<ClienteModel, Long, ClienteRepository> {

    public ClienteService(ClienteRepository repository) {
        super(repository);
    }

    public ClienteModel buscarPorId(Long id){
        return findById(id)
                .orElseThrow(() -> new RecursoNaoEncontradoException("Cliente não encontrado"));
    }

    public Optional<ClienteModel> findByTelefoneAndEmpresaId(String telefone, Long empresaId) {
        return repository.findByTelefoneAndEmpresa_Id(telefone, empresaId);
    }

    public Optional<ClienteModel> findByTelefone(String telefone) {
        return repository.findByTelefone(telefone);
    }
}
