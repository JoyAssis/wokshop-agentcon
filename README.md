# 🔴 Pokédex Agent Lab

Projeto base em **Next.js + TypeScript** para o workshop de agentes, com uma Pokédex funcional e espaço preparado para evolução durante as atividades práticas.

**[🚀 Iniciar Workshop →](https://cyz.github.io/devdays-pokedex/index.html)**

> Atualize o link acima para o endereço publicado do seu repositório.

## O que já vem pronto

1. Carregamento inicial de Pokémons
2. Busca por nome ou ID
3. Grid de cards com estado de seleção
4. Paginação com "Carregar mais"

As funcionalidades avançadas (favoritos, descoberta aleatória, team builder, compartilhamento etc.) são implementadas ao longo do workshop.

## Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- PokeAPI

## Setup local

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Materiais do workshop

```bash
npm run serve-docs
```

Depois, abra `http://localhost:4000/docs/`.

## Estrutura do projeto

```text
pokedex/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── api/pokemon/route.ts
│   │   └── components/
│   │       ├── Header.tsx
│   │       ├── PokedexApp.tsx
│   │       └── PokemonCard.tsx
│   └── lib/
│       ├── api.ts
│       ├── constants.ts
│       └── types.ts
├── workshop/
├── docs/
└── package.json
```
