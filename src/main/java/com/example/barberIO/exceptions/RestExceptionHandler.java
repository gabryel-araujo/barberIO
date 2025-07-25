package com.example.barberIO.exceptions;

import com.example.barberIO.dtos.ApiErrorResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    public ResponseEntity<ApiErrorResponseDto> handleRecursoNaoEncontrado(
            RecursoNaoEncontradoException ex, HttpServletRequest request) {

        ApiErrorResponseDto errorResponse = new ApiErrorResponseDto(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "Recurso Não Encontrado",
                ex.getMessage(),
                request.getRequestURI()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RecursoDuplicadoException.class)
    public ResponseEntity<ApiErrorResponseDto> handleRecursoDuplicado(
            RecursoDuplicadoException ex, HttpServletRequest request) {

        ApiErrorResponseDto errorResponse = new ApiErrorResponseDto(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "Recurso duplicado",
                ex.getMessage(),
                request.getRequestURI()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DadosVioladosException.class)
    public ResponseEntity<ApiErrorResponseDto> handleDadosViolados(
            DadosVioladosException ex, HttpServletRequest request) {

        ApiErrorResponseDto errorResponse = new ApiErrorResponseDto(
                LocalDateTime.now(),
                HttpStatus.NOT_FOUND.value(),
                "Dados Violados",
                ex.getMessage(),
                request.getRequestURI()
        );

        return new ResponseEntity<>(errorResponse, HttpStatus.NOT_FOUND);
    }
}
