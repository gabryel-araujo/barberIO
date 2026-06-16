package com.example.barberIO.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "servico")
@Data
public class ServiceModel implements EmpresaAware, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String descricao;

    private Float preco;

    private Integer duracao;

    private boolean ativo;

    @ManyToMany(mappedBy = "servicos")
    @JsonIgnore
    private List<FuncionarioModel> barbeiros;

    @Column(nullable = true)
    private LocalDateTime created_at;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    @JsonIgnore
    private EmpresaModel empresa;
}
