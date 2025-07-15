 package com.example.barberIO.models;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "config_empresa")
public class ConfigEmpresaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "empresa_id",nullable = false)
    private EmpresaModel empresa;

    @Column(nullable = false)
    private boolean aberto;

    @Column(nullable = false)
    private int intervalo;
    
    @Column(nullable = false)
    private LocalDateTime ultima_alteracao;

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
        return empresa;
    }

    public void setConfig_empresa(EmpresaModel empresa) {
        this.empresa = empresa;
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
}
