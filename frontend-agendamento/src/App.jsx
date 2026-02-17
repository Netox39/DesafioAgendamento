import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [ok, setOk] = useState(!!localStorage.getItem("auth"));
  return ok ? <Dashboard /> : <Login onLogin={() => setOk(true)} />;
}
