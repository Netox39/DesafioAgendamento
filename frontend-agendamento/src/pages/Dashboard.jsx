// frontend-agendamento/src/pages/Dashboard.jsx
import React, { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost, apiPut, apiDelete } from "../client";
import "./dashboard.css";

const TURNOS = ["MANHA", "TARDE", "NOITE"];
const HORARIOS = ["A", "B", "C", "D", "E", "F"];

const SALAS_FIXAS = [
  { id: "11111111-1111-1111-1111-111111111111", descricao: "Sala 101", andar: "1º andar" },
  { id: "22222222-2222-2222-2222-222222222222", descricao: "Sala 102", andar: "1º andar" },
  { id: "33333333-3333-3333-3333-333333333333", descricao: "Sala 201", andar: "2º andar" },
  { id: "44444444-4444-4444-4444-444444444444", descricao: "Sala 202", andar: "2º andar" },
];

const ymd = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const br = (s) => {
  const [y, m, d] = s.split("-");
  return `${d}/${m}/${y}`;
};
const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  d.setHours(0, 0, 0, 0);
  return d;
};

function normalizeAg(a) {
  // backend pode retornar salaId ou sala_id; normaliza
  const salaId = a.salaId ?? a.sala_id ?? a.sala?.id ?? a.sala;
  return {
    id: a.id,
    salaId,
    data: a.data,
    turno: a.turno,
    horario: a.horario,
    descricao: a.descricao,
  };
}

export default function Dashboard() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    salaId: SALAS_FIXAS[0].id,
    data: ymd(new Date()),
    turno: "MANHA",
    horario: "A",
    descricao: "",
  });

  const [modal, setModal] = useState(null);
  const [edit, setEdit] = useState(null);
  const [editando, setEditando] = useState(false);

  const weekStart = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);

  const salasPorAndar = useMemo(() => {
    const map = {};
    for (const s of SALAS_FIXAS) (map[s.andar] ||= []).push(s);
    return Object.entries(map);
  }, []);

  const agBySalaDia = useMemo(() => {
    const map = new Map();
    for (const a0 of agendamentos) {
      const a = normalizeAg(a0);
      if (!a.salaId || !a.data) continue;
      const key = `${a.salaId}|${a.data}`;
      const arr = map.get(key) || [];
      arr.push(a);
      map.set(key, arr);
    }
    return map;
  }, [agendamentos]);

  async function carregar() {
    setLoading(true);
    setErro("");
    try {
      const list = await apiGet("/agendamentos");
      setAgendamentos(Array.isArray(list) ? list : []);
    } catch (e) {
      setErro(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function criar(e) {
    e.preventDefault();
    setErro("");

    if (!form.descricao || !form.descricao.trim()) {
      setErro("Descrição obrigatória.");
      return;
    }

    try {
      setLoading(true);

      console.log("CLICOU EM CRIAR", {
        salaId: form.salaId,
        data: form.data,
        turno: form.turno,
        horario: form.horario,
        descricao: form.descricao,
      });

      await apiPost("/agendamentos", {
        salaId: form.salaId,
        data: form.data,
        turno: form.turno,
        horario: form.horario,
        descricao: form.descricao,
      });

      setForm((f) => ({ ...f, descricao: "" }));

      // recarrega para refletir imediatamente (sem precisar dar F5)
      await carregar();
    } catch (err) {
      setErro(err?.message || "Erro ao criar agendamento");
    } finally {
      setLoading(false);
    }
  }

  function abrirModal(a0) {
    const a = normalizeAg(a0);
    setModal(a);
    setEditando(false);
    setEdit({
      salaId: a.salaId,
      data: a.data,
      turno: a.turno,
      horario: a.horario,
      descricao: a.descricao,
    });
  }

  async function salvar() {
    if (!modal || !editando) return;
    setErro("");

    if (!edit.descricao || !edit.descricao.trim()) {
      setErro("Descrição obrigatória.");
      return;
    }

    try {
      setLoading(true);

      await apiPut(`/agendamentos/${modal.id}`, {
        salaId: edit.salaId,
        data: edit.data,
        turno: edit.turno,
        horario: edit.horario,
        descricao: edit.descricao,
      });

      setModal(null);
      setEditando(false);

      await carregar();
    } catch (e) {
      setErro(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  async function excluir() {
    if (!modal) return;
    if (!confirm("Excluir agendamento?")) return;

    setErro("");
    try {
      setLoading(true);

      await apiDelete(`/agendamentos/${modal.id}`);

      setModal(null);
      await carregar();
    } catch (e) {
      setErro(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h1>Sistema de Agendamento</h1>

      {erro && <div className="error">{erro}</div>}

      <div className="topbar">
        <button onClick={carregar} disabled={loading}>
          {loading ? "Carregando..." : "Recarregar"}
        </button>
      </div>

      <div className="card">
        <h2>Criar agendamento</h2>

        <form onSubmit={criar} className="form">
          <label>
            Sala
            <select value={form.salaId} onChange={(e) => setForm((f) => ({ ...f, salaId: e.target.value }))}>
              {SALAS_FIXAS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.descricao} ({s.andar})
                </option>
              ))}
            </select>
          </label>

          <label>
            Data
            <input type="date" value={form.data} onChange={(e) => setForm((f) => ({ ...f, data: e.target.value }))} />
          </label>

          <label>
            Turno
            <select value={form.turno} onChange={(e) => setForm((f) => ({ ...f, turno: e.target.value }))}>
              {TURNOS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label>
            Horário
            <select value={form.horario} onChange={(e) => setForm((f) => ({ ...f, horario: e.target.value }))}>
              {HORARIOS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </label>

          <label className="desc">
            Descrição
            <input value={form.descricao} onChange={(e) => setForm((f) => ({ ...f, descricao: e.target.value }))} />
          </label>

          <button className="primary" type="submit" disabled={loading}>
            Criar
          </button>
        </form>
      </div>

      <div className="tableWrap">
        <table>
          <thead>
            <tr>
              <th className="sticky-left">Salas</th>
              {days.map((d) => {
                const k = ymd(d);
                return <th key={k}>{br(k)}</th>;
              })}
            </tr>
          </thead>

          <tbody>
            {loading && agendamentos.length === 0 ? (
              <tr>
                <td colSpan={8} className="loading">
                  Carregando...
                </td>
              </tr>
            ) : (
              salasPorAndar.map(([andar, salas]) => (
                <React.Fragment key={andar}>
                  <tr className="floor">
                    <td className="sticky-left">{andar}</td>
                    {days.map((d) => (
                      <td key={`${andar}-${ymd(d)}`} />
                    ))}
                  </tr>

                  {salas.map((s) => (
                    <tr key={s.id}>
                      <td className="sticky-left room">
                        <div className="room-title">{s.descricao}</div>
                        <div className="room-sub">{s.andar}</div>
                      </td>

                      {days.map((d) => {
                        const dayKey = ymd(d);
                        const list = agBySalaDia.get(`${s.id}|${dayKey}`) || [];

                        return (
                          <td key={`${s.id}-${dayKey}`}>
                            {list.length === 0 ? (
                              <span className="empty">—</span>
                            ) : (
                              list.map((a) => (
                                <div key={a.id} className="tag" onClick={() => abrirModal(a)}>
                                  <div className="title">{a.descricao}</div>
                                  <div className="meta">
                                    {a.turno} — {a.horario}
                                  </div>
                                </div>
                              ))
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {modal && edit && (
        <div className="modalBack" onClick={() => setModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modalHeader">
              <strong>Agendamento</strong>
              <button onClick={() => setModal(null)}>✕</button>
            </div>

            <div className="modalBody">
              <label>
                Sala
                <select
                  disabled={!editando}
                  value={edit.salaId}
                  onChange={(e) => setEdit((x) => ({ ...x, salaId: e.target.value }))}
                >
                  {SALAS_FIXAS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.descricao} ({s.andar})
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Data
                <input
                  disabled={!editando}
                  type="date"
                  value={edit.data}
                  onChange={(e) => setEdit((x) => ({ ...x, data: e.target.value }))}
                />
              </label>

              <label>
                Turno
                <select
                  disabled={!editando}
                  value={edit.turno}
                  onChange={(e) => setEdit((x) => ({ ...x, turno: e.target.value }))}
                >
                  {TURNOS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Horário
                <select
                  disabled={!editando}
                  value={edit.horario}
                  onChange={(e) => setEdit((x) => ({ ...x, horario: e.target.value }))}
                >
                  {HORARIOS.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </label>

              <label className="desc">
                Descrição
                <input
                  disabled={!editando}
                  value={edit.descricao}
                  onChange={(e) => setEdit((x) => ({ ...x, descricao: e.target.value }))}
                />
              </label>

              <div className="modalActions">
                <button onClick={() => setEditando((v) => !v)}>{editando ? "Cancelar" : "Editar"}</button>

                <button className="primary" onClick={salvar} disabled={!editando || loading}>
                  Salvar
                </button>

                <button className="danger" onClick={excluir} disabled={loading}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
