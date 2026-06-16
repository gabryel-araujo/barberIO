package com.example.barberIO.models;

import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(name = "cliente")
@Data
public class ClienteModel implements EmpresaAware, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private boolean ativo = true;

    private String telefone;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    private EmpresaModel empresa;

    @Column(nullable = true)
    private LocalDateTime created_at;

}
