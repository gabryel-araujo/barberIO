package com.example.barberIO.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity
@Table(name = "config_empresa")
public class ConfigEmpresaModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne
	@JoinColumn(name = "empresa_id", nullable = false)
	@JsonIgnore
	private EmpresaModel config_empresa;

	@Column(nullable = false)
	private boolean aberto;

	@Column(nullable = false)
	private int intervalo;

	@Column(nullable = false)
	private LocalDateTime ultima_alteracao;

	@OneToMany(mappedBy = "config_empresa", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("id ASC")
	private List<HorarioFuncionamentoModel> horarios = new ArrayList<>();

	@OneToMany(mappedBy = "config_empresa", cascade = CascadeType.ALL, orphanRemoval = true)
	@OrderBy("id ASC")
	private List<FeriadoModel> feriados = new ArrayList<>();

	public LocalDateTime getUltima_alteracao() {
		return ultima_alteracao;
	}

	public void setUltima_alteracao(LocalDateTime ultima_alteracao) {
		this.ultima_alteracao = ultima_alteracao;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EmpresaModel getConfig_empresa() {
		return config_empresa;
	}

	public void setConfig_empresa(EmpresaModel config_empresa) {
		this.config_empresa = config_empresa;
	}

	public boolean isAberto() {
		return aberto;
	}

	public void setAberto(boolean aberto) {
		this.aberto = aberto;
	}

	public int getIntervalo() {
		return intervalo;
	}

	public void setIntervalo(int intervalo) {
		this.intervalo = intervalo;
	}

	public List<HorarioFuncionamentoModel> getHorarios() {
		return horarios;
	}

	public void setHorarios(List<HorarioFuncionamentoModel> horarios) {
		this.horarios = horarios;
	}

	public List<FeriadoModel> getFeriados() {
		return feriados;
	}

	public void setFeriados(List<FeriadoModel> feriados) {
		this.feriados = feriados;
	}

}
