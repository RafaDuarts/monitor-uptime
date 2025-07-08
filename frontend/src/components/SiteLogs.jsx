import { useEffect, useState } from "react";
import { getLogs } from "../api/siteApi";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function SiteLogs({ siteId }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs(siteId).then(res => {
      // Ajustar dados para o gráfico: transformar status em 1 (UP) e 0 (DOWN)
      const data = res.data.map(log => ({
        time: new Date(log.checkedAt).toLocaleTimeString(),
        status: log.status === "UP" ? 1 : 0,
      }));
      setLogs(data);
    });
  }, [siteId]);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Histórico de status</h3>
      <ResponsiveContainer>
        <LineChart data={logs} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="time" />
          <YAxis
            domain={[0, 1]}
            ticks={[0, 1]}
            tickFormatter={val => (val === 1 ? "UP" : "DOWN")}
          />
          <Tooltip
            formatter={val => (val === 1 ? "UP" : "DOWN")}
            labelFormatter={label => `Horário: ${label}`}
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
  );
}
