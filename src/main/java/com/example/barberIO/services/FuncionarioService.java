package com.example.barberIO.services;

import com.example.barberIO.exceptions.RecursoDuplicadoException;
import com.example.barberIO.exceptions.RecursoNaoEncontradoException;
import org.springframework.beans.BeanUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.repositories.FuncionarioRepository;

import com.example.barberIO.details.FuncionarioDetails;

import java.util.Optional;

@Service
public class FuncionarioService implements UserDetailsService{
	
	private final FuncionarioRepository funcionarioRepository;
	
	public FuncionarioService(FuncionarioRepository repository) {
        this.funcionarioRepository = repository;
    }

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		FuncionarioModel funcionario = funcionarioRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Funcionário não encontrado"));
        return new FuncionarioDetails(funcionario);
	}

}
