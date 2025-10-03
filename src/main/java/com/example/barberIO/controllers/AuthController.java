package com.example.barberIO.controllers;

import com.example.barberIO.details.FuncionarioDetails;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;
    @Autowired
    FuncionarioRepository funcionarioRepository; // Injeção do repositório
    @Autowired
    PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authManager, JwtUtil jwtUtil) {
        this.authManager = authManager;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(authRequest.email(), authRequest.senha())
        );

        FuncionarioDetails userDetails = (FuncionarioDetails) authentication.getPrincipal();
        FuncionarioModel funcionario = userDetails.getFuncionario();

        String token = jwtUtil.generateToken(funcionario);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        // 1. Verifica se o email já está em uso
        if (funcionarioRepository.findByEmail(registerRequest.email()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Este email já está cadastrado!");
        }

        // 2. Cria um novo funcionário
        var novoFuncionario = new FuncionarioModel();
        novoFuncionario.setNome(registerRequest.nome());
        novoFuncionario.setEmail(registerRequest.email());
        // 3. Criptografa a senha antes de salvar
        novoFuncionario.setSenha(passwordEncoder.encode(registerRequest.senha()));
        // Adicione outras propriedades se houver, como cargo, etc.
        // novoFuncionario.setCargo("BARBEIRO");

        // 4. Salva o funcionário no banco de dados
        FuncionarioModel funcionarioSalvo = funcionarioRepository.save(novoFuncionario);

        // 5. Gera o token para o novo usuário e retorna
        String token = jwtUtil.generateToken(funcionarioSalvo);
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token));
    }

    public record AuthRequest(String email, String senha) {}
    public record RegisterRequest(String nome, String email, String senha) {} // DTO para o registro
    public record AuthResponse(String token) {}
}
