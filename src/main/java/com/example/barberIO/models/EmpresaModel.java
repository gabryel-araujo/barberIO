package com.example.barberIO.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "empresa")
@Data
public class EmpresaModel implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// ATENÇÃO! QUANDO FOR DESCOMENTAR ESSA LINHA, ALTERAR O BANCO DE DADOS PARA NÃO GERAR MAIS O UUID
	// NESSE MOMENTO, O BANCO DE DADOS É RESPONSÁVEL POR GERAR ESSE UUID
	// QUANDO A MIGRAÇÃO FOR CONCLUÍDA, O JAVA VAI GERAR O UUID E ELE DEVE SER REMOVIDO DO POSTGRESQL
	//@GeneratedValue(strategy = GenerationType.UUID)
	@Column(unique = true, updatable = false, insertable = false)
	private UUID uuid;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private String telefone;

	@Column(nullable = false, unique = true)
	private String email;
	
	private String nacional_id;

	//private Long org_id;

	@Column(nullable = false)
	private LocalDateTime created_at;
	
	@OneToOne(mappedBy = "empresa", cascade = CascadeType.ALL, orphanRemoval = true)
	private EnderecoModel endereco;

	@OneToOne(mappedBy = "config_empresa", cascade = CascadeType.ALL, orphanRemoval = true)
	private ConfigEmpresaModel config_empresa;

	@Column(nullable = true)
	private LocalDateTime ultima_alteracao;

	@Column(nullable = true)
	private String url_img;
}
