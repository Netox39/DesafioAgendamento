const API = "https://agendamento-info.onrender.com";

export function setBasicAuth(user, pass) {
  localStorage.setItem(
    "auth",
    "Basic " + btoa(user + ":" + pass)
  );
}

function headers() {
  const a = localStorage.getItem("auth");
  return a ? { Authorization: a } : {};
}

async function req(method, path, body) {
  const r = await fetch(API + path, {
    method,
    headers: {
      ...headers(),
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!r.ok) {
    throw new Error("HTTP " + r.status);
  }

  return r.json();
}

export const apiGet = (p) => req("GET", p);
export const apiPost = (p, b) => req("POST", p, b);
export const apiPut = (p, b) => req("PUT", p, b);
export const apiDelete = (p) => req("DELETE", p);
