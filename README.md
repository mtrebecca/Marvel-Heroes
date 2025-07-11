# 🦸‍♂️ Marvel App

Aplicação moderna em React + TypeScript para explorar o universo Marvel via API oficial. Visualize heróis, veja detalhes, adicione aos favoritos e muito mais.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-7+-339AF0?style=for-the-badge&logo=mantine&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-1+-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

---

## ✨ Funcionalidades

- 🔍 Busca em tempo real por heróis
- ❤️ Sistema de favoritos
- 📄 Detalhes dos heróis: comics, eventos, séries
- 📊 Paginação e estados de carregamento
- 📱 Layout 100% responsivo
- 🧪 Testes automatizados

---

## 🚀 Tecnologias

- **React 18 + TypeScript 5**
- **Mantine UI** para componentes modernos
- **Vite** para build rápido
- **Framer Motion** para animações
- **Vitest + Testing Library** para testes
- **Context API + Hooks personalizados**
- **Marvel Developer API** (autenticação via MD5 + timestamp)

---

## ⚙️ Requisitos

- Node.js 18+
- npm ou yarn
- Conta gratuita no [Marvel Developer Portal](https://developer.marvel.com/)

---

## 🛠️ Instalação

```bash
git clone https://github.com/mtrebecca/Marvel-Heroes.git
cd Marvel-Heroes
npm install

```
---

## Configuração
Insira suas chaves da Marvel API:
```bash
VITE_MARVEL_PUBLIC_KEY=sua_public_key
VITE_MARVEL_PRIVATE_KEY=sua_private_key

```
## ▶️ Executando
```bash
npm run dev
Acesse em: http://localhost:5173
```

##  🧪 Testes
```bash
npm run test
```