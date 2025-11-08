# 🚀 Guia de Setup do Projeto

## Pré-requisitos

Antes de começar, instale:

- **Node.js** (versão 18 ou superior): [nodejs.org](https://nodejs.org)
- **Git**: [git-scm.com](https://git-scm.com)
- **Expo Go** (app no celular): 
  - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
  - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 1. Clone o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd <NOME_DO_PROJETO>
```

## 2. Instale as Dependências

**Opção A - Instalar tudo de uma vez:**
```bash
# 1. Instale as dependências da raiz primeiro
npm install

# 2. Instale backend e mobile
npm run install:all
```

**Opção B - Instalar manualmente:**
```bash
# 1. Raiz (necessário para os scripts funcionarem)
npm install

# 2. Backend
cd backend
npm install
cd ..

# 3. Mobile
cd mobile
npm install
cd ..
```

## 3 (Não será necessário). Configure as Variáveis de Ambiente

### Backend
Crie um arquivo `.env` na pasta `backend/`:
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
# Adicione outras variáveis conforme necessário
```

### Mobile
Crie um arquivo `.env` na pasta `mobile/` (se necessário):
```env
API_URL=http://localhost:3000
```

## 4. Rode o Projeto

### Opção A - Rodar cada parte separadamente:

**Terminal 1 - Backend:**
```bash
npm run backend
```
✅ O backend estará rodando em `http://localhost:3000`

**Terminal 2 - Mobile:**
```bash
npm run mobile
```
✅ Um QR Code aparecerá no terminal

### Opção B - Rodar tudo junto:
```bash
npm run dev
```

## 5. Visualize o App no Celular

1. Abra o app **Expo Go** no seu celular
2. Escaneie o QR Code que apareceu no terminal
3. Aguarde o app carregar

**Importante:** Seu celular e computador precisam estar na **mesma rede Wi-Fi**

## 6. Desenvolvimento

### Estrutura do Projeto
```
projeto/
├── backend/         # API Nest.js
│   └── src/
├── mobile/          # App React Native
│   └── App.tsx
└── package.json     # Scripts principais
```

### Comandos Úteis

```bash
# Backend
npm run backend        # Modo desenvolvimento

# Mobile
npm run mobile         # Inicia o Expo

# Backend + Mobile     # Inicia os dois serviços* (*na pasta raíz)
npm run dev
```

## 🐛 Problemas Comuns

### Erro: "Port 3000 já está em uso"
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Erro: "Module not found"
```bash
# Limpe e reinstale
cd backend
rm -rf node_modules package-lock.json
npm install

cd ../mobile
rm -rf node_modules package-lock.json
npm install
```

## Documentação da API

### Para acessar nossa API, siga os seguintes passos:

```bash
npm run backend # no diretório raiz ou
npm run start # no diretório do backend
```

✅ A documentação da API estará disponível em `http://localhost:3000/api/docs`