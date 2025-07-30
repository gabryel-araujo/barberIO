package com.example.barberIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.example.barberIO.services.FuncionarioService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final FuncionarioService funcionarioService;

	public SecurityConfig(FuncionarioService funcionarioService) {
		this.funcionarioService = funcionarioService;
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth.requestMatchers("/admin/**").hasRole("GESTOR")
						.requestMatchers("/clientes/**", "/servico", "/empresas", "/configEmpresa",
								"/horarioFuncionamento", "/enderecos", "/feriados")
						.hasAnyRole("GESTOR", "BARBEIRO").requestMatchers("/agendamentos/**").permitAll() // cliente
																											// acessa
																											// direto
						.anyRequest().permitAll())
				.httpBasic();

		return http.build();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(); // 💥 isso que faltava
	}

}
