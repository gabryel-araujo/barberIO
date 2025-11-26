package com.example.barberIO.security;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
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
            .authorizeHttpRequests(auth -> auth.requestMatchers("/agendamentos/**","/public/**","/empresas/**","/error/**").permitAll()
                    // Endpoints específicos
                    //.requestMatchers(HttpMethod.GET,"/agendamentos/**").permitAll()
                    .requestMatchers("/admin/**").hasAnyRole("GESTOR","DEV")
                    .requestMatchers("/clientes/**").hasAnyRole("GESTOR","BARBEIRO","DEV")
                    .requestMatchers("/funcionarios/**").hasAnyRole("GESTOR","BARBEIRO","DEV")
                    .requestMatchers("/servico/**").hasAnyRole("GESTOR","DEV")
                    .requestMatchers("/horarioFuncionamento/**").hasAnyRole("GESTOR","DEV")
                    .requestMatchers("/configEmpresa/**").hasAnyRole("GESTOR","DEV")
                    .requestMatchers("/feriados/**").hasAnyRole("GESTOR","DEV")
                    .requestMatchers("/enderecos/**").hasAnyRole("GESTOR","DEV")
                    .requestMatchers("/auth/login/**","/auth/register/**").permitAll()

                    // Qualquer outra requisição precisa estar autenticada
                    .anyRequest().authenticated()
            )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> ex
                        // 1. Mantém o tratamento para 401 (Usuário NÃO autenticado)
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                            response.setContentType("application/json");
                            response.getWriter().write("{\"error\":\"Usuário sem permissão para a operação\"}");
                        })
                        // 2. Access Denied Handler: Relança a exceção para que o Spring a capture e mostre o trace/detalhes.
                        .accessDeniedHandler((req, res, e) -> {
                            // 🔥 ESSA LINHA É ESSENCIAL para relançar o erro
                            throw e;
                        })
                );
        return http.build();
    }

}
