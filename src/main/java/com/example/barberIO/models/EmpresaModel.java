package com.example.barberIO.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import org.springframework.boot.context.properties.bind.DefaultValue;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static java.time.LocalDateTime.now;

@Entity
@Table(name = "empresa")
public class EmpresaModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String telefone;

	@Column(nullable = false, unique = true)
	private String email;
	
	private String nacional_id;

	private Long org_id;

	@Column(nullable = false)
	private LocalDateTime created_at;
	
	@OneToMany(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private List<EnderecoModel> enderecos = new ArrayList<>();

	@OneToOne(mappedBy = "config_empresa", cascade = CascadeType.ALL, orphanRemoval = true)
	private ConfigEmpresaModel config_empresa;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getTelefone() {
		return telefone;
	}

	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}


	public String getNacional_id() {
		return nacional_id;
	}

	public void setNacional_id(String nacional_id) {
		this.nacional_id = nacional_id;
	}

	public Long getOrg_id() {
		return org_id;
	}

	public void setOrg_id(Long org_id) {
		this.org_id = org_id;
	}

	public LocalDateTime getCreated_at() {
		return created_at;
	}

	public void setCreated_at(LocalDateTime created_at) {
		this.created_at = created_at;
	}

	public List<EnderecoModel> getEnderecos() {
		return enderecos;
	}

	public void setEnderecos(List<EnderecoModel> enderecos) {
		this.enderecos = enderecos;
	}

	public ConfigEmpresaModel getConfig_empresa() {
		return config_empresa;
	}

	public void setConfig_empresa(ConfigEmpresaModel config_empresa) {
		this.config_empresa = config_empresa;
	}

}
