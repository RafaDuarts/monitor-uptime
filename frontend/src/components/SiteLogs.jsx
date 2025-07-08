import { useEffect, useState } from "react";
import { getLogs, getSiteStats } from "../api/siteApi";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function SiteLogs({ siteId }) {
  const [logData, setLogData] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);

  useEffect(() => {
    // Últimos logs (para gráfico de linha)
    getLogs(siteId).then((res) => {
      const data = res.data.map((log) => ({
        time: new Date(log.checkedAt).toLocaleTimeString(),
        status: log.status === "UP" ? 1 : 0,
      }));
      setLogData(data);
    });

    // Estatísticas por dia (para gráfico de barras)
    getSiteStats(siteId).then((res) => {
      setDailyStats(res.data);
    });
  }, [siteId]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Gráfico de linha: últimos logs */}
      {logData.length > 0 && (
        <div style={{ width: "100%", height: 300 }}>
          <h3>Últimos status</h3>
          <ResponsiveContainer>
            <LineChart data={logData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <XAxis dataKey="time" />
              <YAxis
                domain={[0, 1]}
                ticks={[0, 1]}
                tickFormatter={(val) => (val === 1 ? "UP" : "DOWN")}
              />
              <Tooltip
                formatter={(val) => (val === 1 ? "UP" : "DOWN")}
                labelFormatter={(label) => `Horário: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="status"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Gráfico de barras: por dia */}
      {dailyStats.length > 0 && (
        <div style={{ width: "100%", height: 300 }}>
          <h3>Status diário (últimos 7 dias)</h3>
          <ResponsiveContainer>
            <BarChart data={dailyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="UP" stackId="a" fill="#4ade80" name="UP (online)" />
              <Bar dataKey="DOWN" stackId="a" fill="#f87171" name="DOWN (offline)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
