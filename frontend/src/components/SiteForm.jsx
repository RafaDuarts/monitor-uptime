import { useState } from "react";
import { addSite } from "../api/siteApi";
import { useNavigate } from "react-router-dom";
import styles from "./SiteForm.module.css";

export default function SiteForm() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSite({ name, url });
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Nome do site"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="url"
        placeholder="https://exemplo.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />
      <button type="submit">Salvar</button>
    </form>
  );
}
