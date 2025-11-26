package com.example.barberIO.models;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.time.LocalTime;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "horario_funcionamento")
@Data
public class HorarioFuncionamentoModel implements Serializable{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
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

	@Column(nullable = true)
	private int codigo_dia;
	
	@Column(nullable = false)
	private LocalDateTime ultima_alteracao;

	@ManyToOne
	@JoinColumn(name = "empresa_id")
	@JsonIgnore
	private EmpresaModel empresa;
}
