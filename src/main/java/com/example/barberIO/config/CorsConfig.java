package com.example.barberIO.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") //Permite acesso a todos os caminhos da aplicação
                .allowedOrigins("*") //Define os domínios que podem acessar essa API
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH") //Métodos que pódem ser acessíveis
                .allowedHeaders("*"); //Define quais cabeçalhos HTTP são permitidos em solicitações
    }
}