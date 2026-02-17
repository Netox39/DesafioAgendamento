import { useState } from "react";
import { apiGet, setBasicAuth } from "../client";

export default function Login({ onLogin }) {
  const [u, setU] = useState("admin");
  const [p, setP] = useState("admin123");
  const [e, setE] = useState("");

  async function submit(ev) {
    ev.preventDefault();
    setE("");
    try {
      setBasicAuth(u, p);
      await apiGet("/salas");
      onLogin();
    } catch (err) {
      setE(err.message || "Erro");
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 320 }}>
      <input value={u} onChange={(x) => setU(x.target.value)} placeholder="Usuário" />
      <input value={p} onChange={(x) => setP(x.target.value)} placeholder="Senha" type="password" />
      <button type="submit">Entrar</button>
      {e && <div style={{ color: "red" }}>{e}</div>}
    </form>
  );
}
