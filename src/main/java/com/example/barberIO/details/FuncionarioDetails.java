package com.example.barberIO.details;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.barberIO.models.FuncionarioModel;

public class FuncionarioDetails implements UserDetails{
	
	private final FuncionarioModel funcionario;
	
	public FuncionarioDetails(FuncionarioModel funcionario) {
		this.funcionario = funcionario;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities(){
		String role = "ROLE_" + funcionario.getTipo().name();
		return List.of(new SimpleGrantedAuthority(role));
	}
	
	@Override
    public String getPassword() {
        return funcionario.getSenha();
    }

    @Override
    public String getUsername() {
        return funcionario.getEmail();
    }
    
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
}
