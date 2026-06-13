# SKILL: Dogfooding — Pokédex Agent Lab

Propósito
- Fornecer um checklist e fluxo reproduzível para testar a Pokédex como dogfooder crítico. Ideal para agentes humanos ou IA que precisam validar UX, confiabilidade e oportunidades de melhoria.

Quando usar
- Antes de releases ou workshops interativos.
- Ao validar mudanças de UI, performance, API ou experiência do usuário.

Preparo rápido
- Instalar dependências: `npm install`
- Rodar em dev: `npm run dev` (http://localhost:3000)
- Servir materiais do workshop: `npm run serve-docs` (http://localhost:4000/docs/)

Fluxo de dogfooding (passo a passo)
1. Preparação
   - Certifique-se de que a app roda localmente e que a API externa responde (`PokeAPI`).
   - Abra `README.md` e `AGENTS.md` para contexto rápido.
2. Cenários principais (faça interativamente)
   - Exploração inicial: carregar a página, rolar a grade, abrir vários cards.
   - Busca: pesquisar por nome parcial, nome completo e número da Pokédex.
   - Paginação: clicar em `Load more` até carregar mais registros; observar performance.
   - Seleção: clicar em um `PokemonCard` para selecionar/deselecionar.
   - Falha de rede: simular offline ou bloquear chamadas à `PokeAPI` e observar mensagens de erro.
3. Testes de profundidade
   - Acessibilidade: navegar por teclado (Tab), verificar estados `:focus` e labels.
   - Mobile/responsividade: redimensionar janela ou usar device emulator.
   - Performance: avaliar tempo de carregamento inicial e ao carregar mais.
4. UX e diversão
   - Avalie se o fluxo convida a descobrir mais (favoritar, detalhes, mecânicas).
   - Identifique se microinterações/skeletons faltam.
5. Documentar e reportar
   - Para cada problema encontrado, registre: cenário, passos para reproduzir, comportamento esperado e screenshot (quando aplicável).
   - Use arquivo `workshop/` ou abra uma issue no repositório com a tag `dogfood`.

Checklist de verificação rápida
- [ ] App inicia e mostra pokémons iniciais
- [ ] Busca retorna resultados corretos para nome e ID
- [ ] `Load more` carrega mais itens sem travar a UI
- [ ] Seleção de card funciona e é reversível
- [ ] Mensagens de erro úteis quando a API falha
- [ ] Navegação por teclado é possível e clara
- [ ] Layout responsivo em telas pequenas

Critérios de aceitação (mínimos)
- Fluxos principais funcionam sem erros JS visíveis no console.
- Erros de rede exibem mensagem amigável e não travam a página.
- Experiência básica (buscar, carregar, selecionar) dá sensação completa de descoberta.

Formato de saída esperado do dogfooding
- Relatório curto por item: título, passos, severidade (low/medium/high), sugestão de correção, link para `issue` ou anexo.

Exemplos de prompts para usar este skill
- "Execute o fluxo de dogfooding e gere um relatório resumido com 5 melhorias prioritárias." 
- "Teste a busca por 'pikachu' e '25' e descreva diferenças e falhas." 

Próximos passos recomendados
- Criar uma issue template `dogfood` para padronizar relatórios.
- Implementar um pequeno conjunto de e2e (Playwright) cobrindo os fluxos principais.

Links úteis
- [README.md](README.md)
- [AGENTS.md](AGENTS.md)
