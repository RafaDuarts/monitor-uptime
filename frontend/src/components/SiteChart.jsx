import { useEffect, useState } from "react";
import { getSiteStats } from "../api/siteApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function SiteChart({ siteId }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    getSiteStats(siteId).then((res) => {
      setData(res.data);
    });
  }, [siteId]);

  if (data.length === 0) return null;

  return (
    <div style={{ width: "100%", height: 300, marginTop: 16 }}>
      <h4 style={{ marginBottom: 8 }}>Gráfico de status (últimos 7 dias)</h4>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="UP" fill="#4ade80" name="UP (online)" />
          <Bar dataKey="DOWN" fill="#f87171" name="DOWN (offline)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
