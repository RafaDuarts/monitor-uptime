const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const siteRoutes = require("./routes/siteRoutes");
const startMonitoring = require("./jobs/monitorSites");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sites", siteRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Conectado ao MongoDB");
  app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
  startMonitoring(); // inicia o job de monitoramento
}).catch((err) => {
  console.error("❌ Erro ao conectar no MongoDB", err);
});
