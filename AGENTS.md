# AGENTS — Instruções rápidas para agentes de IA

Breve resumo e comandos essenciais para começar a trabalhar neste repositório.

Propósito
- Repositório: demo de Pokédex em **Next.js + TypeScript** usado em workshops.
- Objetivo das instruções: dar ao agente informações mínimas e acionáveis para ser produtivo.

Comandos mais usados
- Instalar dependências: `npm install`
- Rodar em desenvolvimento: `npm run dev` (acessa http://localhost:3000)
- Build: `npm run build`
- Start (produção): `npm run start`
- Testes: `npm run test`, `npm run test:watch`, `npm run test:coverage` (Jest)
- Servir materiais do workshop: `npm run serve-docs` (abre `http://localhost:4000/docs/`)

Pontos-chave do código
- App (Next.js): [src/app](src/app)
- Rotas de API: [src/app/api/pokemon/route.ts](src/app/api/pokemon/route.ts)
- Componentes principais: [src/app/components/Header.tsx](src/app/components/Header.tsx), [src/app/components/PokedexApp.tsx](src/app/components/PokedexApp.tsx), [src/app/components/PokemonCard.tsx](src/app/components/PokemonCard.tsx)
- Biblioteca utilitária: [src/lib](src/lib)

Testes e lint
- Testes usam `jest` (config em `jest.config.js`).
- Lint com `next lint` (script `lint`).

Convenições e orientações para agentes
- Preferir alterações pequenas e explícitas; não reescrever arquivos grandes sem necessidade.
- Linkar ou referenciar documentação existente em vez de copiar (veja `README.md` e a pasta `docs/`).
- Quando propor mudanças que afetam o comportamento do app, inclua instruções para reproduzir localmente (scripts e URLs).

Onde olhar primeiro
- [README.md](README.md) — visão geral e comandos rápidos.
- `docs/` — materiais do workshop (servidos por `npm run serve-docs`).
- `workshop/` — guias das etapas do workshop.

Contato
- Não há contatos definidos no repositório; levante dúvidas via issues quando necessário.
