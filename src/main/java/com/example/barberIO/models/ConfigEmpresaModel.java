package com.example.barberIO.models;

import jakarta.persistence.*;

@Entity
@Table(name = "config_empresa")
public class ConfigEmpresaModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @JoinColumn(name = "empresa_id",nullable = false)
    private EmpresaModel config_empresa;

    @Column(nullable = false)
    private boolean aberto;

    @Column(nullable = false)
    private int intervalo;

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
}
