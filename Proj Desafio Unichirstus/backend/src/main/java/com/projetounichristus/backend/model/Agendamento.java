package com.projetounichristus.backend.model;

import com.projetounichristus.backend.model.enums.Horario;
import com.projetounichristus.backend.model.enums.Turno;

import java.time.LocalDate;
import java.util.UUID;

public class Agendamento {

    private UUID id;
    private UUID salaId;
    private LocalDate data;
    private Turno turno;
    private Horario horario;
    private String descricao;

    public Agendamento() {
    }

    public Agendamento(UUID id, UUID salaId, LocalDate data, Turno turno, Horario horario, String descricao) {
        this.id = id;
        this.salaId = salaId;
        this.data = data;
        this.turno = turno;
        this.horario = horario;
        this.descricao = descricao;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getSalaId() {
        return salaId;
    }

    public void setSalaId(UUID salaId) {
        this.salaId = salaId;
    }

    public LocalDate getData() {
        return data;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Turno getTurno() {
        return turno;
    }

    public void setTurno(Turno turno) {
        this.turno = turno;
    }

    public Horario getHorario() {
        return horario;
    }

    public void setHorario(Horario horario) {
        this.horario = horario;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
}
