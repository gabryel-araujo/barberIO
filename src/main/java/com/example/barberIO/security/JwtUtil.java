package com.example.barberIO.security;

import com.example.barberIO.models.FuncionarioModel;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Component
public class JwtUtil {

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);

    private final Key   key;
    private final long  expiration;
    private static final String ISSUER   = "barberIO";
    private static final String AUDIENCE = "barberIO-client";// 1 dia

    public JwtUtil(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.expiration:86400000}") long expiration) {
        byte[] keyBytes = Base64.getDecoder().decode(secret);
        if (keyBytes.length < 32) {
            throw new IllegalArgumentException(
                    "jwt.secret deve ter pelo menos 32 bytes (256 bits).");
        }
        this.key        = Keys.hmacShaKeyFor(keyBytes);
        this.expiration = expiration;
    }

    public String generateToken(FuncionarioModel funcionario) {
        return Jwts.builder()
                .setIssuer(ISSUER)
                .setAudience(AUDIENCE)
                .claim("id",funcionario.getId())
                .setSubject(funcionario.getEmail())
                .claim("nome",funcionario.getNome())
                .claim("role",funcionario.getTipo())
                .claim("empresa_id",funcionario.getEmpresa().getId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(key)
                .compact();
    }

    public Optional<Claims> validateAndExtractClaims(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .requireIssuer(ISSUER)
                    .requireAudience(AUDIENCE)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return Optional.of(claims);
        } catch (ExpiredJwtException e) {
            logger.warn("JWT expirado: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.warn("JWT não suportado: {}", e.getMessage());
        } catch (MalformedJwtException e) {
            logger.warn("JWT malformado: {}", e.getMessage());
        } catch (io.jsonwebtoken.security.SecurityException e) {
            logger.warn("Assinatura JWT inválida: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.warn("JWT vazio ou nulo: {}", e.getMessage());
        }
        return Optional.empty();
    }

    public Optional<String> extractUsername(String token) {
        return validateAndExtractClaims(token)
                .map(Claims::getSubject);
    }

    public boolean isTokenValid(String token) {
        return validateAndExtractClaims(token).isPresent();
    }
}
