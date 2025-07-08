import { useState, useEffect } from "react";
import SiteLogs from "./SiteLogs";
import { getLogs, getUptime } from "../api/siteApi";
import styles from "./SiteCard.module.css";

export default function SiteCard({ site, onDelete }) {
  const [showLogs, setShowLogs] = useState(false);
  const [status, setStatus] = useState(null);
  const [uptime, setUptime] = useState(null);

  useEffect(() => {
    // Buscar status atual
    getLogs(site._id).then(res => {
      if (res.data.length > 0) {
        setStatus(res.data[0].status);
      }
    });

    // Buscar uptime
    getUptime(site._id).then(res => {
      if (res.data.uptime !== null) {
        setUptime(res.data.uptime);
      }
    });
  }, [site]);

  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <div className={styles["site-info"]}>
          <strong>{site.name}</strong>
          <p>{site.url}</p>

          {uptime !== null && (
            <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
              Uptime (24h): <strong>{uptime}%</strong>
            </p>
          )}

          <button onClick={() => setShowLogs(!showLogs)} style={{ alignSelf: "start" }}>
            {showLogs ? "Ocultar histórico" : "Mostrar histórico"}
          </button>
        </div>
        <div className={styles.actions}>
          {status && (
            <span className={status === "UP" ? styles.badgeUp : styles.badgeDown}>
              {status}
            </span>
          )}
          <button className="danger" onClick={() => onDelete(site._id)}>
            🗑️
          </button>
        </div>
      </div>

      {showLogs && (
        <div className={styles["site-logs-container"]}>
          <SiteLogs siteId={site._id} />
        </div>
      )}
    </div>
  );
}
