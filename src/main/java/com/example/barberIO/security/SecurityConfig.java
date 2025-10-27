package com.example.barberIO.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.requestMatchers("/agendamentos/**","/public/**","/empresas/**").permitAll()
                    // Endpoints específicos
                    .requestMatchers("/admin/**").hasRole("GESTOR")
                    .requestMatchers("/clientes/**").hasAnyRole("GESTOR","BARBEIRO")
                    .requestMatchers("/funcionarios/**").hasAnyRole("GESTOR","BARBEIRO")
                    .requestMatchers("/servico/**").hasRole("GESTOR")
                    .requestMatchers("/horarioFuncionamento/**").hasRole("GESTOR")
                    .requestMatchers("/configEmpresa/**").hasRole("GESTOR")
                    .requestMatchers("/feriados/**").hasRole("GESTOR")
                    .requestMatchers("/enderecos/**").hasRole("GESTOR")
                    .requestMatchers("/auth/login/**","/auth/register/**").permitAll()
                    // Qualquer outra requisição precisa estar autenticada
                    .anyRequest().authenticated()
            )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> ex
                        // Quando o usuário não está autenticado
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\":\"Usuário não autenticado\"}");
                        })
                        // Quando o usuário está autenticado, mas sem permissão
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\":\"Acesso negado\"}");
                        })
                )
                // 🔥 ESSA LINHA É ESSENCIAL
                .exceptionHandling(ex -> ex
                        .accessDeniedHandler((req, res, e) -> {
                            // Deixa o erro subir — NÃO trata aqui
                            throw e;
                        })
                );
        ;


        return http.build();
    }

}
