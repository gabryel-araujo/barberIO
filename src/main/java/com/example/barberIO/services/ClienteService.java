package com.example.barberIO.services;

import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import com.example.barberIO.models.ClienteModel;
import com.example.barberIO.repositories.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public ClienteModel buscarPorId(Long id){
        return clienteRepository.findById(id).orElseThrow(()->new RecursoNaoEncontradoException("Cliente não encontrado"));
    }
}
