package com.example.barberIO.models;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import java.io.Serializable;
import java.time.LocalDateTime;
@Entity
@Table(name = "empresa")
public class EmpresaModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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
	
	@OneToOne(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonManagedReference
	private EnderecoModel endereco;

	@OneToOne(mappedBy = "config_empresa", cascade = CascadeType.ALL, orphanRemoval = true)
	private ConfigEmpresaModel config_empresa;

	@Column(nullable = true)
	private LocalDateTime ultima_alteracao;

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

	public EnderecoModel getEndereco() {
		return endereco;
	}

	public void setEndereco(EnderecoModel endereco) {
		this.endereco = endereco;
	}

	public ConfigEmpresaModel getConfig_empresa() {
		return config_empresa;
	}

	public void setConfig_empresa(ConfigEmpresaModel config_empresa) {
		this.config_empresa = config_empresa;
	}

	public LocalDateTime getUltima_alteracao() {
		return ultima_alteracao;
	}

	public void setUltima_alteracao(LocalDateTime ultima_alteracao) {
		this.ultima_alteracao = ultima_alteracao;
	}
}
