const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Site = require("../models/Site");
const StatusLog = require("../models/StatusLog");

// Listar todos os sites
router.get("/", async (req, res) => {
  const sites = await Site.find();
  res.json(sites);
});

// Criar novo site
router.post("/", async (req, res) => {
  const { name, url } = req.body;
  const site = new Site({ name, url });
  await site.save();
  res.status(201).json(site);
});

// Buscar últimos logs de um site
router.get("/:siteId/logs", async (req, res) => {
  const logs = await StatusLog.find({ siteId: req.params.siteId })
    .sort({ checkedAt: -1 })
    .limit(20);
  res.json(logs);
});

// Deletar site e seus logs
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Site.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Site não encontrado" });

    await StatusLog.deleteMany({ siteId: req.params.id });

    res.json({ message: "Site e logs removidos com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar site:", err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

// Uptime nas últimas 24 horas
router.get("/:id/uptime", async (req, res) => {
  const { id } = req.params;
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24h atrás

  try {
    const logs = await StatusLog.find({
      siteId: id,
      createdAt: { $gte: since },
    });

    if (logs.length === 0) {
      return res.json({ uptime: null }); // Sem dados
    }

    const total = logs.length;
    const up = logs.filter(log => log.status === "UP").length;
    const uptime = (up / total) * 100;

    res.json({ uptime: uptime.toFixed(2) });
  } catch (err) {
    console.error("Erro ao calcular uptime:", err);
    res.status(500).json({ error: "Erro ao calcular uptime" });
  }
});

// Estatísticas para gráfico (últimos 7 dias)
router.get("/:id/stats", async (req, res) => {
  const { id } = req.params;

  try {
    const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // últimos 7 dias

    const stats = await StatusLog.aggregate([
      {
        $match: {
          siteId: new mongoose.Types.ObjectId(id),
          createdAt: { $gte: since }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            status: "$status"
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // Reorganizar por dia
    const result = {};
    stats.forEach(({ _id, count }) => {
      const date = _id.date;
      const status = _id.status;
      if (!result[date]) {
        result[date] = { date, UP: 0, DOWN: 0 };
      }
      result[date][status] = count;
    });

    res.json(Object.values(result));
  } catch (err) {
    console.error("Erro ao buscar estatísticas:", err);
    res.status(500).json({ error: "Erro ao buscar estatísticas" });
  }
});

module.exports = router;
