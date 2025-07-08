# 📡 Monitor de Uptime

Aplicação completa para monitoramento de disponibilidade de sites, com alerta por e-mail, histórico de status e visualização em gráficos.

---

## 🛠️ Tecnologias utilizadas

### Backend
- Node.js
- Express
- MongoDB (via Atlas)
- Mongoose
- Nodemailer
- dotenv

### Frontend
- React (com Vite)
- Axios
- CSS Modules
- Recharts
- React Router DOM

---

## 📦 Instalação

### Pré-requisitos
- Node.js 16+
- MongoDB (recomendado MongoDB Atlas)
- npm

---

## 🔧 Backend

### 1. Instalar dependências

```bash
cd backend
npm install
```

### 2. Criar o arquivo `.env`

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
EMAIL_USER=seu@email.com
EMAIL_PASS=sua_senha
```

> Use variáveis corretas do seu SMTP (por exemplo, Gmail, Outlook ou serviço de envio de email transacional).

### 3. Iniciar servidor

```bash
npm run dev
```

---

## 💻 Frontend

### 1. Instalar dependências

```bash
cd frontend
npm install
```

### 2. Criar o arquivo `.env`

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Iniciar o frontend

```bash
npm run dev
```

---

## 📋 Funcionalidades

- ✅ Cadastrar sites para monitoramento
- ✅ Verificar disponibilidade automaticamente (intervalo definido no backend)
- ✅ Alertas por e-mail ao detectar indisponibilidade
- ✅ Histórico de status com timestamp
- ✅ Gráfico de disponibilidade
- ✅ Interface em modo escuro (Dark Mode fixo)

---

## 📈 Exemplo de visualização

- Lista com os sites cadastrados
- Botão para remover site
- Botão "Mostrar histórico" que exibe um gráfico com status (UP/DOWN)

---

## 📝 Licença

Projeto de uso pessoal/educacional. Fique à vontade para personalizar, evoluir e utilizar como portfólio!

---

## 👨‍💻 Autor

Rafael Duarte – [LinkedIn](https://www.linkedin.com/in/rafaduarts/)
