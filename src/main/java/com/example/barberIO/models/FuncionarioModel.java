package com.example.barberIO.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.example.barberIO.enums.TipoFuncionario;
import lombok.Data;

@Entity
@Table(name="funcionario")
@Data
public class FuncionarioModel implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    @Email
    @Column(unique = true)
    private String email;

    private String senha;

    private String data_nascimento;

    private boolean disponivel = false;

    private boolean ativo = true;

    private float avaliacao = 0;

    private float experiencia;

    private int atendimentos = 0;

    private String avatar;

    @Enumerated(EnumType.STRING)
    private TipoFuncionario tipo;

    @ManyToMany
    @JoinTable(
            name = "barbeiro_servico",
            joinColumns = @JoinColumn(name = "barbeiro_id"),
            inverseJoinColumns = @JoinColumn(name = "servico_id")
    )
    private List<ServiceModel> servicos = new ArrayList<>();

    @Column(nullable = true)
    private LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    @JsonIgnore
    private EmpresaModel empresa;

    @Column(nullable = true)
    private LocalDateTime fechamento_ini;

    @Column(nullable = true)
    private LocalDateTime fechamento_fim;

    @Column(nullable = true)
    private Float comissao;

}
