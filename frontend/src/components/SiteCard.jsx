import { useState, useEffect } from "react";
import SiteLogs from "./SiteLogs";
import { getLogs } from "../api/siteApi";
import styles from "./SiteCard.module.css";

export default function SiteCard({ site, onDelete }) {
  const [showLogs, setShowLogs] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getLogs(site._id).then(res => {
      if (res.data.length > 0) {
        setStatus(res.data[0].status);
      }
    });
  }, [site]);

  return (
    <div className={styles.card}>
      <div className={styles["card-header"]}>
        <div className={styles["site-info"]}>
          <strong>{site.name}</strong>
          <p>{site.url}</p>
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
