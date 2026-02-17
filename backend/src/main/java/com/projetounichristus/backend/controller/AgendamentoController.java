package com.projetounichristus.backend.controller;

import com.projetounichristus.backend.model.Agendamento;
import com.projetounichristus.backend.model.Sala;
import com.projetounichristus.backend.service.AgendamentoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@RestController
public class AgendamentoController {

    private final AgendamentoService service;

    public AgendamentoController(AgendamentoService service) {
        this.service = service;
    }

    @GetMapping("/salas")
    public List<Sala> listarSalas() {
        return service.listarSalas();
    }

    @GetMapping("/agendamentos")
    public List<Agendamento> listar() {
        return service.listarAgendamentos();
    }

    @GetMapping("/agendamentos/{id}")
    public ResponseEntity<?> buscar(@PathVariable UUID id) {
        try {
            return ResponseEntity.ok(service.buscarPorId(id));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @PostMapping("/agendamentos")
    public ResponseEntity<?> criar(@RequestBody Agendamento agendamento) {
        try {
            return ResponseEntity.ok(service.criar(agendamento));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/agendamentos/{id}")
    public ResponseEntity<?> atualizar(@PathVariable UUID id, @RequestBody Agendamento agendamento) {
        try {
            return ResponseEntity.ok(service.atualizar(id, agendamento));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/agendamentos/{id}")
    public ResponseEntity<?> deletar(@PathVariable UUID id) {
        try {
            service.deletar(id);
            return ResponseEntity.noContent().build();
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
