import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddSite from "./pages/AddSite";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 16, borderBottom: "1px solid #333", backgroundColor: "#1e1e1e" }}>
        <Link to="/" style={{ marginRight: 12, color: "var(--fg)" }}>🏠 Sites</Link>
        <Link to="/add" style={{ color: "var(--fg)" }}>➕ Adicionar</Link>
      </nav>
      <div style={{ padding: 16 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddSite />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
