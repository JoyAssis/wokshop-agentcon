# Parte 1: Configuração e Engenharia de Contexto

[← Visão Geral](00-overview.md)

---

Nesta seção, você configurará seu ambiente de desenvolvimento e ensinará o GitHub Copilot sobre sua base de código.

---

## 🔧 Configuração Inicial

### Passo 1: Criar Seu Repositório (Obrigatório)

1. [Abra o repositório do workshop no GitHub](https://github.com/cyz/devdays-pokedex)
2. Clique em **Use this template** (Usar este modelo) → **Create a new repository** (Criar um novo repositório)
   - Nome: `my-pokedex`
   - Visibilidade: **Public** (Público)
3. ✅ Seu próprio repositório Pokédex está pronto!

### Passo 2: Ativar o GitHub Pages

1. Vá em **Settings** (Configurações) → **Pages** (Páginas) no seu repositório
2. Sob a seção "Build and deployment", mude *Deploy from a branch* para **GitHub Actions**
3. Faça commit de qualquer alteração para disparar o primeiro deploy
4. ✅ A documentação do workshop estará disponível em: `https://{seu-usuario-github}.github.io/{nome-do-repositorio}/`

### Passo 3: Escolha Como Desenvolver

#### Opção A: Clonar localmente no VS Code

1. Abra o VS Code
2. Execute o comando: `Git: Clone` → `Clone from GitHub`
3. Selecione seu novo repositório
4. Instale as extensões recomendadas (uma notificação aparecerá para você aceitar)

#### Opção B: Criar um Codespace

1. Abra seu repositório no GitHub
2. Clique no botão **Code** (Código) → **Codespaces** → **Create codespace on main** (Criar codespace na main)
3. ✅ O Codespace iniciará com seu repositório e uma versão do VS Code rodando direto no navegador.

### Passo 4: Rodar o Aplicativo

Abra um terminal e execute:

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) e explore o app.  
✅ **Sucesso:** O aplicativo inicial da Pokédex foi carregado! Você pode pesquisar Pokémon por nome ou ID e carregar mais itens.

Mantenha este guia do workshop aberto (📌 **Fixe a aba / Pin tab**).

---

## 📚 Entendendo Engenharia de Contexto

Engenharia de contexto é o processo de ensinar a IA sobre sua base de código específica. Isso faz com que as sugestões do Copilot sejam muito mais precisas e relevantes para o seu projeto.

### Tarefa 1: Gerar Instruções Automaticamente

As instruções guiam todas as interações do agente, tornando-as mais eficientes e confiáveis.

**Passos:**

1. Abra o painel do Chat no modo Agente (Agent Mode)
2. Execute o prompt:
   ```
   /init
   ```
   - Enquanto o agente analisa o projeto, siga para a Tarefa 2 em uma nova janela de conversa (chat)
3. Quando o comando `/init` terminar, revise o arquivo gerado em `.github/copilot-instructions.md`
   - O arquivo está conciso? Não está prolixo ou longo demais?
   - Refinamento opcional:
     ```
     Reduza o tamanho dele e adicione uma lista de verificação (checklist) de desenvolvimento obrigatória [ ] no topo (lint, build)
     ```
4. **Aplique** as alterações e faça o commit

✅ **Resultado:** Todas as consultas futuras terão um mapa de contexto do seu espaço de trabalho.

---

### Tarefa 2: Testes de Experiência (Dogfooding) com o Agente Navegador

O agente é capaz de abrir seu aplicativo em execução no navegador integrado e interagir diretamente com ele.

**Passos:**

1. Certifique-se de que o comando `npm run dev` está rodando
2. No Chat (em modo Agente / Agent Mode), envie o prompt:
   ```
   Teste a Pokédex como um dogfooder crítico, dando um feedback sincero sobre o quão divertida ela é de usar e o que está faltando.
   ```
3. Assista ao agente iniciar o navegador, clicar pelo aplicativo e gerar um relatório completo
4. Salve como uma habilidade reutilizável:
   ```
   /create-skill para dogfooding deste aplicativo
   ```

✅ **Resultado:** Você tem uma habilidade de dogfooding reutilizável que testa o seu aplicativo em tempo real.

> 💡 **Lição sobre engenharia de contexto:** O agente precisa de contexto prático — rodar o app, ver a interface, clicar nos fluxos — para realmente entender como ele funciona. Apenas olhar o código estático muitas vezes não é suficiente.

---

### Tarefa 3: Explorar os Ajustes Customizados do Repositório

**Passos:**

1. Abra o painel de Customizações: `Chat: Open Customizations (Preview)`
2. Navegue pelas instruções geradas automaticamente e por eventuais habilidades salvas
3. Analise como a estrutura do projeto está descrita

> 💡 **Pense sobre:** Quais convenções dos seus projetos reais poderiam ser descritas como instruções ou habilidades reutilizáveis?

---

## ✅ Parte 1 Concluída!

Você aprendeu a:
- Configurar seu ambiente de desenvolvimento
- Gerar e refinar instruções de espaço de trabalho usando `/init`
- Fazer testes de experiência (dogfooding) em seu aplicativo com suporte ao navegador
- Criar e salvar habilidades customizadas reutilizáveis
