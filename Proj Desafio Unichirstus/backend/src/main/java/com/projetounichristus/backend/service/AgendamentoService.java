package com.projetounichristus.backend.service;

import com.projetounichristus.backend.model.Agendamento;
import com.projetounichristus.backend.model.Sala;
import com.projetounichristus.backend.model.enums.Horario;
import com.projetounichristus.backend.model.enums.SalaStatus;
import com.projetounichristus.backend.model.enums.Turno;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class AgendamentoService {

    private final List<Sala> salas = List.of(
            new Sala(UUID.fromString("11111111-1111-1111-1111-111111111111"), "Sala 101", "1º andar", 40, SalaStatus.ATIVA),
            new Sala(UUID.fromString("22222222-2222-2222-2222-222222222222"), "Sala 102", "1º andar", 35, SalaStatus.ATIVA),
            new Sala(UUID.fromString("33333333-3333-3333-3333-333333333333"), "Sala 201", "2º andar", 50, SalaStatus.ATIVA),
            new Sala(UUID.fromString("44444444-4444-4444-4444-444444444444"), "Sala 202", "2º andar", 30, SalaStatus.EM_MANUTENCAO)
    );

    private final Map<UUID, Agendamento> agendamentos = new LinkedHashMap<>();

    public AgendamentoService() {
        UUID id = UUID.randomUUID();
        agendamentos.put(id, new Agendamento(
                id,
                salas.get(0).getId(),
                LocalDate.now(),
                Turno.MANHA,
                Horario.A,
                "Aula teórica de anatomia humana - Turma 55A123B"
        ));
    }

    public List<Sala> listarSalas() {
        return salas;
    }

    public List<Agendamento> listarAgendamentos() {
        return new ArrayList<>(agendamentos.values());
    }

    public Agendamento buscarPorId(UUID id) {
        Agendamento ag = agendamentos.get(id);
        if (ag == null) throw new NoSuchElementException("Agendamento não encontrado");
        return ag;
    }

    public Agendamento criar(Agendamento novo) {
        validar(novo);

        if (existeConflito(novo, null)) {
            throw new IllegalArgumentException("Já existe agendamento para essa sala nesse dia/turno/horário.");
        }

        UUID id = UUID.randomUUID();
        novo.setId(id);
        agendamentos.put(id, novo);
        return novo;
    }

    public Agendamento atualizar(UUID id, Agendamento dados) {
        if (!agendamentos.containsKey(id)) throw new NoSuchElementException("Agendamento não encontrado");
        validar(dados);

        if (existeConflito(dados, id)) {
            throw new IllegalArgumentException("Já existe agendamento para essa sala nesse dia/turno/horário.");
        }

        dados.setId(id);
        agendamentos.put(id, dados);
        return dados;
    }

    public void deletar(UUID id) {
        if (!agendamentos.containsKey(id)) throw new NoSuchElementException("Agendamento não encontrado");
        agendamentos.remove(id);
    }

    private void validar(Agendamento ag) {
        if (ag.getSalaId() == null) throw new IllegalArgumentException("salaId é obrigatório");
        if (ag.getData() == null) throw new IllegalArgumentException("data é obrigatória");
        if (ag.getTurno() == null) throw new IllegalArgumentException("turno é obrigatório");
        if (ag.getHorario() == null) throw new IllegalArgumentException("horario é obrigatório");
        if (ag.getDescricao() == null || ag.getDescricao().isBlank())
            throw new IllegalArgumentException("descricao é obrigatória");

        boolean salaExiste = salas.stream().anyMatch(s -> s.getId().equals(ag.getSalaId()));
        if (!salaExiste) throw new IllegalArgumentException("Sala não existe (mock)");
    }

    private boolean existeConflito(Agendamento novo, UUID ignorarId) {
        return agendamentos.values().stream().anyMatch(a ->
                (ignorarId == null || !a.getId().equals(ignorarId)) &&
                        a.getSalaId().equals(novo.getSalaId()) &&
                        a.getData().equals(novo.getData()) &&
                        a.getTurno().equals(novo.getTurno()) &&
                        a.getHorario().equals(novo.getHorario())
        );
    }
}
