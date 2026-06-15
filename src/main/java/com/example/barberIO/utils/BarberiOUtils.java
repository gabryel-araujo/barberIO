package com.example.barberIO.utils;

import com.example.barberIO.models.EmpresaModel;
import com.example.barberIO.models.FuncionarioModel;
import com.example.barberIO.repositories.FuncionarioRepository;
import com.example.barberIO.security.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class BarberiOUtils {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public EmpresaModel validarEmpresaLogada (HttpServletRequest req) {
        String authHeader = req.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token ausente ou inválido");
        }

        String token = authHeader.substring(7);
        Optional<String> usuarioLogado = jwtUtil.extractUsername(token);

        return usuarioLogado
                .flatMap(funcionarioRepository::findByEmail)
                .map(FuncionarioModel::getEmpresa)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
    }
}
