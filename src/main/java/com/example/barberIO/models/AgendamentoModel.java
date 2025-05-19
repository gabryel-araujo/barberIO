package com.example.barberIO.models;

import jakarta.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "agendamento")
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

    public LocalDateTime getFim() {
        return fim;
    }

    public void setFim(LocalDateTime fim) {
        this.fim = fim;
    }

    public ClienteModel getCliente() {
        return cliente;
    }

    public void setCliente(ClienteModel cliente) {
        this.cliente = cliente;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getHorario() {
        return horario;
    }

    public void setHorario(LocalDateTime horario) {
        this.horario = horario;
    }

    public FuncionarioModel getBarbeiro() {
        return barbeiro;
    }

    public void setBarbeiro(FuncionarioModel barbeiro) {
        this.barbeiro = barbeiro;
    }

    public ServiceModel getServico() {
        return servico;
    }

    public void setServico(ServiceModel servico) {
        this.servico = servico;
    }
}
