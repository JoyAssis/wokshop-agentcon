# 📚 Referência Rápida — Pokédex Agent Lab

## Principais Comandos do VS Code

| Comando | O que ele faz |
|---------|---------------|
| `Ctrl/Cmd + Shift + P` | Paleta de Comandos (Command Palette) |
| `Ctrl/Cmd + Shift + I` | Abrir Painel de Chat (Modo Agente / Agent Mode) |
| `/init` | Gerar as instruções iniciais do repositório |
| `/new` | Criar um novo arquivo utilizando IA diretamente |

## Modos de Conversa (Switching Modes)

- **Ask (Perguntar)** — Esclarecer dúvidas, explicar códigos e receber explicações  
- **Edit (Sugerir Edições)** — Fazer edições diretas em arquivos únicos  
- **Agent (Modo Agente)** — Realizar de forma autônoma tarefas complexas em múltiplos arquivos (use-o na maior parte do tempo!)  
- **Plan (Modo Planejamento)** — Planejar cuidadosamente as etapas antes de executá-las (excelente para grandes mudanças na base de código)

## Prompts Essenciais Usados no Curso

### Engenharia de Contexto
```
/init
```
```
Resuma a arquitetura da base de código em uma seção concisa do README
```

### Testes de Experiência (Dogfooding)
```
Abra o aplicativo em http://localhost:3000 no navegador. Teste-o sistematicamente como um usuário crítico e escreva um relatório detalhado.
```

### Funcionalidades (Modo Plano)
```
Ative o Modo Plano (Plan Mode) para planejar e implementar um recurso de favoritos na Pokédex salvando no localStorage e criando filtros adequados.
```

```
Adicione um botão "🎲 Aleatório" (Random) ao cabeçalho (Header) que escolha e destaque um Pokémon aleatório da lista carregada atualmente.
```

### Orquestração TDD (Agentes Customizados)
```
@TDD Supervisor: Crie o módulo utilitário do construtor de equipes em `src/lib/teamUtils.ts` (addToTeam, removeFromTeam, getTypeCoverage, getCoverageGaps) e gerencie o ciclo TDD com testes e implementação de forma autônoma.
```

## Dicas do Copilot

- 🔁 **Itere sobre os planos** — Sempre ajuste o plano gerado pelo menos 2 vezes antes de clicar em implementar  
- 📌 **Fixe este guia** — Clique com o botão direito na aba → clicar em Fixar (Pin)  
- ⏪ **Checkpoints** — O Copilot cria pontos de restauração automaticamente antes de cada alteração; use a opção *Undo Last Action* para desfazer erros  
- 🌐 **Navegador Integrado** — O Copilot consegue abrir `localhost:3000` na própria janela ou em background e interagir de verdade com cliques na sua interface    

## Estrutura do Projeto

```text
pokedex/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Componente de servidor (Server Component), busca de dados iniciais
│   │   ├── layout.tsx            # Layout raiz (Root Layout)
│   │   ├── globals.css
│   │   ├── api/pokemon/          # Rota da API REST para Pokémon
│   │   └── components/
│   │       ├── PokedexApp.tsx    # Gerenciamento de estado inicial da Pokédex
│   │       ├── Header.tsx        # Barra de topo, busca e cabeçalho principal
│   │       └── PokemonCard.tsx   # Visual individual do cartão de Pokémon
│   └── lib/
│       ├── api.ts        # Utilitários de busca na PokéAPI
│       ├── types.ts      # Interfaces e definições do TypeScript
│       └── constants.ts  # Constantes compartilhadas pelo projeto
├── docs/                 # Documentação do workshop (publicada via GitHub Pages)
└── workshop/             # Guias passo a passo do workshop (esta pasta que você está lendo!)
```
