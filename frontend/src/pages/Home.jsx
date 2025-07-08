import { useEffect, useState } from "react";
import { getSites, deleteSite } from "../api/siteApi";
import SiteCard from "../components/SiteCard";

export default function Home() {
  const [sites, setSites] = useState([]);

  const fetchSites = async () => {
    const res = await getSites();
    setSites(res.data);
  };

  const handleDelete = async (id) => {
    await deleteSite(id);
    fetchSites();
  };

  useEffect(() => {
    fetchSites();
  }, []);

  return (
    <div>
      <h2>🔍 Sites monitorados</h2>
      {sites.length === 0 && <p>Nenhum site ainda.</p>}
      {sites.map((site) => (
        <SiteCard key={site._id} site={site} onDelete={handleDelete} />
      ))}
    </div>
  );
}
