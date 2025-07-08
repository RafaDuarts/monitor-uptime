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

    await StatusLog.create({ siteId: site._id, status: "UP", responseTime });
    console.log(`✅ ${site.url} está online (${responseTime}ms)`);
  } catch (error) {
    await StatusLog.create({ siteId: site._id, status: "DOWN", responseTime: 0 });
    console.log(`❌ ${site.url} está fora do ar`);
    sendAlert(site);
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
