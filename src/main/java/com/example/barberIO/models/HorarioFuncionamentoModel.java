package com.example.barberIO.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "horario_funcionamento")
public class HorarioFuncionamentoModel implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false)
	private Boolean aberto;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private LocalTime abertura;
	
	@Column(nullable = false)
	private LocalTime fechamento;
	
	@ManyToOne
	@JoinColumn(name = "config_empresa_id", nullable = false)
	@JsonIgnore
	private ConfigEmpresaModel config_empresa;
	
	@Column(nullable = false)
	private LocalDateTime ultima_alteracao;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Boolean getAberto() {
		return aberto;
	}

	public void setAberto(Boolean aberto) {
		this.aberto = aberto;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public LocalTime getAbertura() {
		return abertura;
	}

	public void setAbertura(LocalTime abertura) {
		this.abertura = abertura;
	}

	public LocalTime getFechamento() {
		return fechamento;
	}

	public void setFechamento(LocalTime fechamento) {
		this.fechamento = fechamento;
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
