package com.example.barberIO.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class RecursoDuplicadoException extends RuntimeException {
    public RecursoDuplicadoException(String message){
        super(message);
    }
}
