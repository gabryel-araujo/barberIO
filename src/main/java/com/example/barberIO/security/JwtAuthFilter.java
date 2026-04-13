package com.example.barberIO.security;

import com.example.barberIO.services.FuncionarioService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final FuncionarioService funcionarioService;
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthFilter.class);
    private final TokenBlacklistService blacklistService;

    public JwtAuthFilter(JwtUtil jwtUtil, FuncionarioService funcionarioService, TokenBlacklistService blacklistService) {
        this.jwtUtil = jwtUtil;
        this.funcionarioService = funcionarioService;
        this.blacklistService = blacklistService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest  request,
                                    HttpServletResponse response,
                                    FilterChain         filterChain)
            throws ServletException, IOException {

        extractBearerToken(request)
                .filter(token->!blacklistService.isTokenRevogado(token))
                .flatMap(jwtUtil::validateAndExtractClaims)   // valida UMA única vez
                .ifPresent(claims -> authenticate(claims, request));

        filterChain.doFilter(request, response);
    }

    private Optional<String> extractBearerToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return Optional.of(header.substring(7).trim());
        }
        return Optional.empty();
    }

    private void authenticate(Claims claims, HttpServletRequest request) {
        // Só autentica se ainda não houver contexto de segurança (evita sobreposição)
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            return;
        }

        String email = claims.getSubject();
        if (email == null || email.isBlank()) {
            logger.warn("Token sem subject válido.");
            return;
        }

        try {
            var userDetails = funcionarioService.loadUserByUsername(email);
            var auth = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(auth);
        } catch (Exception e) {
            // Usuário removido/desativado após emissão do token
            logger.warn("Não foi possível autenticar usuário '{}': {}", email, e.getMessage());
        }
    }
}
