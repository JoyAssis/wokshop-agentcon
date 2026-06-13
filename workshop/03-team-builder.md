# Parte 3: Construtor de Equipes (Team Builder)

[← Parte 2](02-favorites.md)

---

Nesta parte, você construirá um **Construtor de Equipes (Team Builder)** — uma funcionalidade que permite aos usuários montar uma equipe de até 6 Pokémon e analisar a cobertura de tipos combinada deles. 

Para tornar o desenvolvimento resiliente e profissional, usaremos **Test-Driven Development (TDD)** de forma 100% automatizada e orquestrada por uma equipe de **Custom Agents** que já deixamos pré-configurados no seu repositório.

---

## 🤖 Os Agentes Customizados no Projeto

Sob a pasta `.github/agents/`, existem quatro agentes dedicados para essa tarefa:
- **TDD Supervisor**: O orquestrador central do ciclo. Ele analisa suas instruções e gerencia os demais subagentes.
- **TDD Red**: Especialista em escrever suites de testes abrangentes que assinalam falhas no estado de código inicial.
- **TDD Green**: Especialista em consertar testes quebrando com a menor dose de código necessária.
- **TDD Refactor**: Analisa o código que já passou nos testes e sugere melhorias de arquitetura/arquivos sem quebrar o comportamento.

---

## 🧪 Tarefa 1: O Ciclo TDD Completo com o TDD Supervisor

Você irá descrever a regra de negócio do nosso utilitário e do algoritmo de types para o orquestrador e deixá-lo realizar a mágica!

**Passos:**

1. Abra uma nova janela de Chat e mude para o **Modo Agente (Agent Mode)**.
2. Selecione o agente **TDD Supervisor** no menu de seleção de agentes de chat (por exemplo, clicando no seletor de agentes ou digitando `@TDD Supervisor`).
3. Envie o seguinte prompt de instruções para ele:
   ```markdown
   Crie o módulo utilitário do construtor de equipes em `src/lib/teamUtils.ts` seguindo o ciclo TDD:
   - `addToTeam(team: Pokemon[], pokemon: Pokemon): Pokemon[]` — adiciona se a equipe < 6, sem duplicatas
   - `removeFromTeam(team: Pokemon[], pokemonId: number): Pokemon[]`
   - `getTypeCoverage(team: Pokemon[]): string[]` — retorna todos os tipos únicos cobertos pela equipe
   - `getCoverageGaps(team: Pokemon[]): string[]` — retorna os tipos NÃO cobertos por nenhum membro da equipe (veja a lista completa de tipos disponíveis no arquivo `src/lib/constants.ts`)
   ```
4. **Assista à Orquestração:**
   - O **TDD Supervisor** criará o plano e gerenciará os testes e a implementação das funções de maneira autônoma com você!
5. Verifique manualmente rodando os testes no seu terminal para comemorar:
   ```bash
   npm test
   ```

✅ **Resultado:** Todo o motor de regras de negócio do Construtor de Times criado no fluxo correto de TDD de forma transparente e 100% autônoma!

---

## 🏗️ Tarefa 2: Construir a Interface do Construtor de Equipes

Com a lógica utilitária testada e aprovada, desenvolva o componente visual.

**Passos:**

1. Alterne para o **Modo Agente (Agent Mode)** no painel do Chat.
2. Envie o prompt:
   ```markdown
   Implemente um recurso de Construtor de Equipes (Team Builder) integrado à Pokédex:
   - Um botão "➕ Adicionar à Equipe" em cada PokemonCard (desativado quando a equipe tiver 6 Pokémon ou o Pokémon já estiver nela)
   - Um Painel de Equipe mostrando as fotos de até 6 Pokémon e um botão para "Limpar Equipe"
   - Mostre os tipos cobertos e as lacunas calculadas usando as funções do `src/lib/teamUtils.ts`
   ```
3. Teste o fluxo de montar equipe e certifique-se de que a cobertura de tipos está sendo exibida e atualizada.

✅ **Resultado:** Os usuários agora podem montar e analisar equipes de Pokémon com relatórios instantâneos de fraquezas e coberturas de tipo.

---

## ✅ Parte 3 Concluída!

Você aprendeu a:
- Utilizar **orquestração de múltiplos agentes especializados (Multi-Agent System)** para automação de TDD
- Criar regras complexas de tipos do Pokémon sob um barramento sólido de testes Jest
- Desenvolver interfaces ricas baseadas em Tailwind e integradas com estados lógicos e funções testadas utilitárias
- Validar builds de produção do Next.js sem nenhum erro de tipagem!
