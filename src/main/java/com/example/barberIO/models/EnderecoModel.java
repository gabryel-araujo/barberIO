package com.example.barberIO.models;

import java.io.Serializable;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "endereco")
@Data
public class EnderecoModel implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false)
	private String rua;
	
	@Column(nullable = true)
	private String numero;
	
	@Column(nullable = true)
	private String bairro;
	
	@Column(nullable = true)
	private String complemento;
	
	@Column(nullable = true)
	private String cidade;
	
	@Column(length = 8, nullable = true)
	private String cep;
	
	@Column(nullable = false)
	private LocalDateTime created_at;
	
	@OneToOne
	@JoinColumn(name = "empresa_id", nullable = false)
	@JsonIgnore
	private EmpresaModel empresa;
}
