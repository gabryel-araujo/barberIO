package com.example.barberIO.dtos;

import java.time.LocalDateTime;

public record ApiErrorResponseDto(
        LocalDateTime timestamp,
        Integer status,
        String error,
        String message,
        String path
){}
