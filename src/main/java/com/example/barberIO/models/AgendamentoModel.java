package com.example.barberIO.models;

import com.example.barberIO.enums.TipoAgendamento;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamento")
@Data
public class AgendamentoModel implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime horario;

    private LocalDateTime fim;

    @ManyToOne
    @JoinColumn(name = "barbeiro_id")
    private FuncionarioModel barbeiro;

    @ManyToOne
    @JoinColumn(name = "servico_id")
    private ServiceModel servico;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private ClienteModel cliente;

    @ManyToOne
    @JoinColumn(name = "empresa_id")
    @JsonIgnore
    private EmpresaModel empresa;

    //mudar para false após a criação e rodar o alter table no banco para modificar o not null
    @Column(nullable = true)
    @Enumerated(EnumType.STRING)
    private TipoAgendamento status;
}
