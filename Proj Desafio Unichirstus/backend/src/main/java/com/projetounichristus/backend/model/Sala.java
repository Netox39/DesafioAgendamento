package com.projetounichristus.backend.model;

import com.projetounichristus.backend.model.enums.SalaStatus;

import java.util.UUID;

public class Sala {

    private UUID id;
    private String descricao;
    private String andar;
    private int capacidade;
    private SalaStatus status;

    public Sala() {
    }

    public Sala(UUID id, String descricao, String andar, int capacidade, SalaStatus status) {
        this.id = id;
        this.descricao = descricao;
        this.andar = andar;
        this.capacidade = capacidade;
        this.status = status;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getAndar() {
        return andar;
    }

    public void setAndar(String andar) {
        this.andar = andar;
    }

    public int getCapacidade() {
        return capacidade;
    }

    public void setCapacidade(int capacidade) {
        this.capacidade = capacidade;
    }

    public SalaStatus getStatus() {
        return status;
    }

    public void setStatus(SalaStatus status) {
        this.status = status;
    }
}
