const cron = require("node-cron");
const axios = require("axios");
const Site = require("../models/Site");
const StatusLog = require("../models/StatusLog");
const sendAlert = require("../services/sendAlert");

async function checkSite(site) {
  try {
    const start = Date.now();
    await axios.get(site.url, { timeout: 5000 });
    const responseTime = Date.now() - start;
    const currentStatus = "UP";

    // Salvar log
    await StatusLog.create({ siteId: site._id, status: currentStatus, responseTime });

    // Se status mudou, enviar alerta
    if (site.lastStatus !== currentStatus) {
      console.log(`🔔 Alteração detectada: ${site.url} voltou ao ar (${responseTime}ms)`);
      await sendAlert(site, currentStatus);
    }

    // Atualizar status atual no banco
    site.lastStatus = currentStatus;
    await site.save();

    console.log(`✅ ${site.url} está online (${responseTime}ms)`);

  } catch (error) {
    const currentStatus = "DOWN";

    // Salvar log
    await StatusLog.create({ siteId: site._id, status: currentStatus, responseTime: 0 });

    // Se status mudou, enviar alerta
    if (site.lastStatus !== currentStatus) {
      console.log(`🔔 Alteração detectada: ${site.url} está fora do ar`);
      await sendAlert(site, currentStatus);
    }

    // Atualizar status atual no banco
    site.lastStatus = currentStatus;
    await site.save();

    console.log(`❌ ${site.url} está fora do ar`);
  }
}


function startMonitoring() {
  cron.schedule("*/2 * * * *", async () => {
    console.log("⏱️ Verificando sites...");
    const sites = await Site.find();
    for (const site of sites) {
      await checkSite(site);
    }
  });
}

module.exports = startMonitoring;
