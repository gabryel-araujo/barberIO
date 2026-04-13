package com.example.barberIO.security;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistService {
    private final StringRedisTemplate stringRedisTemplate;

    public TokenBlacklistService(StringRedisTemplate stringRedisTemplate) {
        this.stringRedisTemplate = stringRedisTemplate;
    }

    public void revogarToken(String token, long exp) {
        stringRedisTemplate.opsForValue().set("blacklist:" + token, "revogado", exp, TimeUnit.MILLISECONDS);
    }

    public boolean isTokenRevogado(String token) {
        return stringRedisTemplate.hasKey("blacklist:" + token);
    }
}
