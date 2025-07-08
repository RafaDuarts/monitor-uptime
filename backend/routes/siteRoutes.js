const express = require("express");
const router = express.Router();
const Site = require("../models/Site");
const StatusLog = require("../models/StatusLog");

router.get("/", async (req, res) => {
  const sites = await Site.find();
  res.json(sites);
});

router.post("/", async (req, res) => {
  const { name, url } = req.body;
  const site = new Site({ name, url });
  await site.save();
  res.status(201).json(site);
});

router.get("/:siteId/logs", async (req, res) => {
  const logs = await StatusLog.find({ siteId: req.params.siteId }).sort({ checkedAt: -1 }).limit(20);
  res.json(logs);
});

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

module.exports = router;
