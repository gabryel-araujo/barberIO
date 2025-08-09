package com.example.barberIO.security;

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
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth.requestMatchers("/agendamentos/**","/public/**").permitAll()
                    // Endpoints específicos
                    .requestMatchers("/admin/**").hasRole("GESTOR")
                    .requestMatchers("/clientes/**").hasAnyRole("GESTOR","BARBEIRO")
                    .requestMatchers("/servico/**").hasRole("GESTOR")
                    .requestMatchers("/horarioFuncionamento/**").hasRole("GESTOR")
                    .requestMatchers("/empresa/**").hasRole("GESTOR")
                    .requestMatchers("/configEmpresa/**").hasRole("GESTOR")
                    .requestMatchers("/feriados/**").hasRole("GESTOR")
                    .requestMatchers("/enderecos/**").hasRole("GESTOR")
                    .requestMatchers("/auth/login").permitAll()
                    // Qualquer outra requisição precisa estar autenticada
                    .anyRequest().authenticated()
            )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));


        return http.build();
    }

	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
