# 🔌 Monitor de Uptime

Aplicativo completo (frontend + backend + banco de dados) para monitorar a disponibilidade de sites e receber alertas em caso de queda.

## 📊 Funcionalidades

- Adicionar e excluir sites para monitoramento
- Verificar status de cada site a cada 2 minutos
- Alertas por e-mail quando o site fica offline
- Logs de status com data/hora
- Gráfico de histórico de status (linha)
- Gráfico de status diário (barras)
- Exibição de uptime nas últimas 24h por site
- Interface responsiva com tema dark

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório
```bash
git clone https://github.com/seu-usuario/monitor-uptime.git
cd monitor-uptime
```

### 2. Backend (Node.js + MongoDB)

```bash
cd backend
npm install
```

Crie um arquivo `.env` com o seguinte conteúdo:

```env
PORT=5000
MONGO_URI=CONEXAO_DO_SEU_MONGODB_ATLAS
EMAIL_FROM=seuemail@gmail.com
EMAIL_PASSWORD=senha-gerada-app
```

Inicie o servidor:
```bash
npm start
```

### 3. Frontend (Vite + React)

```bash
cd ../frontend
npm install
```

Crie um arquivo `.env` com:
```env
VITE_API_URL=http://localhost:5000/api
```

Inicie a aplicação:
```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## 🔧 Tecnologias utilizadas

### Backend
- Node.js
- Express
- Mongoose
- Node-cron
- Nodemailer

### Frontend
- React + Vite
- Recharts (gráficos)
- CSS Modules

### Banco de Dados
- MongoDB Atlas (Cloud)

---

## 🔒 Sugestões futuras
- Autenticação de usuário (JWT)
- Notificações por Telegram ou Slack
- Exportação de logs em CSV
- Deploy com Docker + Railway / Render



---

## 📝 Licença

Projeto de uso pessoal/educacional. Fique à vontade para personalizar, evoluir e utilizar como portfólio!

---

## 👨‍💻 Autor

Rafael Duarte – [LinkedIn](https://www.linkedin.com/in/rafaduarts/)
