package com.example.barberIO.controllers;

import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.repositories.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @PostMapping("/login")
    public ResponseEntity<Object> login(@RequestBody Map<String,String> request){
        String email = request.get("email");
        String senha = request.get("senha");

        Optional<FuncionarioModel> funcionario = funcionarioRepository.findByEmail(email);

        if(funcionario.isEmpty() || !funcionario.get().getSenha().equals(senha)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos!");
        }

        String token = UUID.randomUUID().toString();
        return ResponseEntity.status(HttpStatus.OK).body(Map.of("token",token));
    }
}
