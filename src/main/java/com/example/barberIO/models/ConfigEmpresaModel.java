package com.example.barberIO.models;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "config_empresa")
@Data
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

}
