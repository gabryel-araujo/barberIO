package com.example.barberIO.security;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class TokenBlacklistService {
    private final Map<String, Long> blacklist = new ConcurrentHashMap<>();

    public void revogarToken(String token, long exp) {
        if (exp > 0) {
            blacklist.put(token, System.currentTimeMillis() + exp);
        }
    }

    public boolean isTokenRevogado(String token) {
        Long expiration = blacklist.get(token);
        if (expiration == null) {
            return false;
        }
        if (System.currentTimeMillis() > expiration) {
            blacklist.remove(token);
            return false;
        }
        return true;
    }
}
