package com.example.barberIO.models;

import java.io.Serializable;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "feriados")
@Data
public class FeriadoModel implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String nome;
	
	@Column(nullable = false)
	private LocalDate data;
	
	@Column(nullable = false)
	private Boolean recorrente;
	
	@ManyToOne
	@JoinColumn(name = "config_empresa_id", nullable = false)
	@JsonIgnore
	private ConfigEmpresaModel config_empresa;

	@ManyToOne
	@JoinColumn(name = "empresa_id")
	@JsonIgnore
	private EmpresaModel empresa;
}
