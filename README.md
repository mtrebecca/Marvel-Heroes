# 🦸‍♂️ Marvel Heroes App

Uma aplicação moderna e responsiva para explorar o universo Marvel! Construída com React 18, TypeScript e Mantine UI, esta aplicação oferece uma experiência completa para descobrir, favoritar e gerenciar seus heróis favoritos da Marvel.

![React](https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Mantine](https://img.shields.io/badge/Mantine-7+-339AF0?style=for-the-badge&logo=mantine&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-1+-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)

## ✨ Funcionalidades Principais

### 🏠 Interface e Navegação

- **📱 Design Responsivo**: Interface moderna que se adapta a qualquer dispositivo
- **🎨 Interface Intuitiva**: Design limpo e organizado com tema Marvel
- **🧭 Navegação Fluida**: Transições suaves entre páginas com React Router
- **⚡ Performance Otimizada**: Carregamento rápido e cache inteligente

### 🔍 Busca e Filtros

- **🔍 Busca em Tempo Real**: Filtragem instantânea por nome e descrição dos heróis
- **📊 Contador de Resultados**: Mostra quantos heróis foram encontrados
- **🎯 Busca Inteligente**: Suporte a termos parciais e case-insensitive

### ❤️ Sistema de Favoritos

- **💾 Persistência Local**: Favoritos salvos no localStorage
- **🔔 Notificações Toast**: Feedback visual ao adicionar/remover favoritos
- **📋 Página Dedicada**: Visualize todos os seus heróis favoritos
- **⚡ Acesso Rápido**: Toggle de favoritos diretamente nos cards

### 📄 Paginação e Dados

- **📄 Paginação Moderna**: Navegação entre páginas com informações detalhadas
- **📈 Informações Completas**: Total de resultados e página atual
- **🔄 Estados de Loading**: Indicadores visuais durante carregamento
- **🛡️ Tratamento de Erros**: Mensagens amigáveis para problemas de conexão

### 🦸‍♂️ Detalhes dos Heróis

- **📖 Biografia Completa**: Descrição detalhada de cada herói
- **📚 Comics Relacionados**: Lista de comics em que o herói aparece
- **📺 Séries**: Séries de TV e animações relacionadas
- **🎪 Eventos**: Eventos importantes da Marvel

## 🚀 Tecnologias Utilizadas

### 🎯 Core Frontend

- **⚛️ React 18** - Biblioteca principal com features mais recentes
- **📘 TypeScript 5+** - Tipagem estática para maior segurança e produtividade
- **🎨 Mantine UI v7** - Biblioteca de componentes moderna e acessível
- **🚀 Vite 6** - Build tool ultrarrápido para desenvolvimento

### 🧭 Roteamento e Estado

- **🧭 React Router v6** - Navegação SPA com nested routes
- **🗂️ Context API** - Gerenciamento de estado global simples e eficaz
- **🪝 Custom Hooks** - Lógica reutilizável e bem organizada

### 🎭 UI/UX e Animações

- **🎭 Framer Motion** - Animações fluidas e micro-interactions
- **🎨 SCSS** - Preprocessador CSS com variáveis personalizadas
- **📱 CSS Grid/Flexbox** - Layout responsivo moderno
- **🎯 Lucide Icons** - Ícones modernos e consistentes

### 🧪 Testes e Qualidade

- **🧪 Vitest** - Framework de testes moderno e rápido
- **🔍 Testing Library** - Testes focados na experiência do usuário
- **📏 ESLint** - Linting e padronização de código
- **🎯 30 Testes Unitários** - Cobertura completa dos componentes principais

### 🌐 API e Dados

- **🦸‍♂️ Marvel API Oficial** - Dados reais e atualizados da Marvel
- **💾 LocalStorage** - Persistência de favoritos e preferências
- **🔐 Hash MD5 Authentication** - Autenticação segura com timestamp
- **📊 Cache Inteligente** - Sistema de cache para otimizar requests
- **🛡️ Rate Limiting Protection** - Proteção automática contra limites da API

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** 18+ ([Download aqui](https://nodejs.org/))
- **npm** (incluído com Node.js)
- **Git** ([Download aqui](https://git-scm.com/))

## 🔑 Configuração da API Marvel

### 1. 🎫 Obtenha suas Chaves da API

1. **Acesse** [Marvel Developer Portal](https://developer.marvel.com/)
2. **Crie** uma conta gratuita
3. **Clique** em **"Get a Key"** para obter suas chaves
4. **Anote** sua **Public Key** e **Private Key**

### 2. 🌐 Configure os Domínios Autorizados

No painel da Marvel Developer:

1. Acesse **"My Account"** → **"Manage API Keys"**
2. Adicione os seguintes **domínios autorizados**:

```
localhost
127.0.0.1
```

⚠️ **IMPORTANTE**:

- Use apenas o domínio, **SEM** a porta
- ❌ **NÃO** use: `localhost:5173` ou `http://localhost`
- ✅ **USE**: `localhost` e `127.0.0.1`

## 🛠️ Instalação e Configuração

### 1. 📥 Clone o Repositório

```bash
git clone <url-do-seu-repositorio>
cd marvel-heroes-app
```

### 2. 📦 Instale as Dependências

```bash
npm install
```

### 3. 🔧 Configure as Variáveis de Ambiente

**Copie o arquivo de exemplo:**

```bash
cp .env.example .env
```

**Edite o arquivo `.env` com suas chaves reais:**

```env
# Marvel API Configuration
VITE_MARVEL_PUBLIC_KEY=sua_public_key_aqui
VITE_MARVEL_PRIVATE_KEY=sua_private_key_aqui
```

⚠️ **SEGURANÇA CRÍTICA**:

- **NUNCA** comite o arquivo `.env` no Git
- **MANTENHA** sua chave privada segura
- **USE** apenas suas próprias chaves da API
- **REMOVA** as chaves antes de compartilhar o código

## 🏃‍♂️ Executando a Aplicação

### 🔥 Modo Desenvolvimento

```bash
npm run dev
```

🌐 **Aplicação disponível em**: `http://localhost:5173`

### 🏗️ Build para Produção

```bash
npm run build
```

### 👀 Preview da Build

```bash
npm run preview
```

## 🧪 Executando os Testes

### ▶️ Comandos de Teste

```bash
# Executar todos os testes em modo watch
npm run test

# Executar testes uma vez
npm run test:run

# Executar com interface gráfica
npm run test:ui
```

### 📊 Cobertura de Testes

**30 testes unitários** cobrindo:

- ✅ **Componentes**: HeroCard, Loading, SearchBar
- ✅ **Hooks**: useLocalSearch com 9 cenários
- ✅ **Navegação**: Interações e roteamento
- ✅ **Favoritos**: Sistema completo de favoritos
- ✅ **Busca**: Filtros e resultados em tempo real

## 🎮 Como Usar a Aplicação

### 🏠 Página Inicial

1. **Visualize** a lista de heróis Marvel
2. **Use a busca** para filtrar por nome ou descrição
3. **Clique** em um card para ver detalhes completos
4. **Favorite** heróis clicando no ícone de coração
5. **Navigate** entre páginas usando a paginação

### ❤️ Página de Favoritos

1. **Acesse** através do menu superior
2. **Visualize** todos os heróis favoritados
3. **Remova** favoritos clicando no coração preenchido
4. **Navegue** para detalhes clicando nos cards

### 📖 Página de Detalhes

1. **Biografia completa** do herói selecionado
2. **Comics** em que o herói aparece
3. **Séries** relacionadas ao personagem
4. **Eventos** importantes da Marvel
5. **Botão favoritar** sempre disponível

### 🔍 Sistema de Busca

- **Digite** qualquer termo na barra de busca
- **Resultados** aparecem instantaneamente
- **Busca** por nome e descrição
- **Contador** mostra quantos heróis foram encontrados

## 🔧 Resolução de Problemas

### ❌ Erro: "Invalid referrer"

**Problema**: Domínio não autorizado na Marvel API

**Solução**:

```bash
1. ✅ Adicione 'localhost' nos domínios autorizados
2. ✅ Limpe o cache do navegador (Ctrl+Shift+Delete)
3. ✅ Tente acessar via 127.0.0.1 em vez de localhost
4. ✅ Verifique se não há espaços no domínio configurado
```

### ❌ Erro: "Invalid hash"

**Problema**: Chave privada incorreta ou inválida

**Solução**:

```bash
1. ✅ Verifique se VITE_MARVEL_PRIVATE_KEY está correta
2. ✅ Certifique-se que não há espaços extras no .env
3. ✅ Regenere as chaves no painel Marvel se necessário
4. ✅ Reinicie o servidor de desenvolvimento
```

### ⏰ API Temporariamente Bloqueada

**Problema**: Rate limit da Marvel API excedido

**Solução**:

```bash
1. ✅ A aplicação tem proteção automática integrada
2. ✅ Evite fazer muitas requests em sequência
3. ✅ Use o cache automático da aplicação
```

### 🐌 Performance Lenta

**Possíveis Soluções**:

```bash
1. ✅ Verifique sua conexão com a internet
2. ✅ O cache da aplicação funciona automaticamente
3. ✅ Monitore o console para logs de erro
4. ✅ Limpe dados do localStorage: localStorage.clear()
```

## 🚀 Deploy em Produção

### 🌟 Vercel (Recomendado)

1. **Conecte** seu repositório no [Vercel](https://vercel.com)
2. **Configure** as variáveis de ambiente:
   - `VITE_MARVEL_PUBLIC_KEY=sua_public_key`
   - `VITE_MARVEL_PRIVATE_KEY=sua_private_key`
3. **Adicione** seu domínio de produção nos referrers da Marvel
4. **Deploy** automático a cada push!

### 🔥 Netlify

1. **Conecte** no [Netlify](https://netlify.com)
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. **Configure** as variáveis no painel de ambiente

### ⚙️ Configuração para Produção

**Domínios para adicionar na Marvel API**:

```
seudominio.com
www.seudominio.com
```
### 🎨 Customizando o Visual

**Cores do tema Marvel** (`src/index.scss`):

```scss
:root {
  --marvel-red: #ed1d24; /* Cor principal da Marvel */
  --marvel-blue: #0096ff; /* Azul secundário */
  --marvel-yellow: #ffc500; /* Amarelo de destaque */
  --marvel-dark: #151515; /* Escuro para contraste */
}
```


### 🎯 APIs e Dados

- **[Marvel Comics](https://www.marvel.com/)** - Pelos dados incríveis da API oficial
- **[Marvel Developer Portal](https://developer.marvel.com/)** - Pela documentação excelente

### 🛠️ Tecnologias

- **[React Team](https://reactjs.org/)** - Biblioteca
- **[Mantine](https://mantine.dev/)** - Componentes modernos
- **[Framer Motion](https://www.framer.com/motion/)** - Animações fluidas
- **[Vite](https://vitejs.dev/)** - Ferramenta de build

---
---

<div align="center">

**🦸‍♂️ Desenvolvido com ❤️ para a comunidade Marvel**

_Este projeto não tem afiliação oficial com a Marvel Comics_

</div>
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
