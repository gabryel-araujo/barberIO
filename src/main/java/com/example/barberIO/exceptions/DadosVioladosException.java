package com.example.barberIO.exceptions;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class DadosVioladosException extends RuntimeException {
    public DadosVioladosException(String message){
        super(message);
    }
}
