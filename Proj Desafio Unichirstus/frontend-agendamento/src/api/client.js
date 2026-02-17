const API = import.meta.env.VITE_API_URL || "http://localhost:8080";

export function setBasicAuth(user, pass) {
  localStorage.setItem("auth", "Basic " + btoa(user + ":" + pass));
}

function headers() {
  const a = localStorage.getItem("auth");
  return a ? { Authorization: a } : {};
}

async function req(method, path, body) {
  const r = await fetch(API + path, {
    method,
    headers: { ...headers(), ...(body ? { "Content-Type": "application/json" } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  });

  const t = await r.text();
  let d;
  try { d = t ? JSON.parse(t) : null; } catch { d = t; }

  if (!r.ok) {
    const msg = (d && (d.error || d.message)) || "";
    if (r.status === 400) throw new Error("Não é possível criar o mesmo agendamento.");
    throw new Error(msg || ("HTTP " + r.status));
  }


  return d;
}

export const apiGet = (p) => req("GET", p);
export const apiPost = (p, b) => req("POST", p, b);
export const apiPut = (p, b) => req("PUT", p, b);
export const apiDelete = (p) => req("DELETE", p);
