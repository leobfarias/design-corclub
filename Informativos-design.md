# Informativos — Central de comunicação do parceiro

**Arquivo:** [Informativos.html](Informativos.html) · **Tipo:** página pública (site) · **Idioma:** PT-BR
**Status:** integrada à galeria ([index.html](index.html)) como 9ª entrega

---

## Propósito

Hub semanal de comunicação para o corretor parceiro. Concentra três tipos de
conteúdo num só lugar — **notícias** do mercado e das operadoras, **avisos**
operacionais e **campanhas** de incentivo — para que o corretor venda "com mais
informação e menos surpresa". É a ponte editorial entre o site institucional e a
área logada (painel do corretor), reaproveitando o mesmo sistema visual.

---

## Anatomia da página (de cima para baixo)

1. **Topband** (faixa `#0B1530`, 46px) — contato, telefone/WhatsApp e ícones sociais.
2. **Masthead sticky** (88px, fundo branco com blur/saturate) — marca CorClub
   (mark azul arredondado + nome), navegação principal e dois CTAs pill
   (outline + solid).
3. **Page hero** — bloco em degradê azul (`--brand → --brand-deep → --brand-darker`)
   com textura de pontos, breadcrumb, eyebrow "Central de comunicação do parceiro",
   título grande e três estatísticas: **Semanal** · **12** operadoras monitoradas ·
   **4** campanhas ativas.
4. **Feed "Notícias, novidades e campanhas"** (`#feed`) — cabeçalho com data de
   atualização + **filtros em pill** (Tudo 15 · Notícias 5 · Campanhas 4 · Avisos 6),
   um **card de campanha em destaque** (layout 2 colunas) e a grade de cards do feed.
5. **Comunicados importantes** (`#comunicados`) — lista de avisos operacionais
   (tabelas, prazos de análise, manutenções, treinamentos).
6. **Newsletter** — bloco de captura de e-mail "Receba os informativos no seu e-mail".

---

## Card de campanha em destaque

Peça central da página, em grade `1.2fr / .8fr`:

- **Lado esquerdo (corpo):** tags (Campanha · Em destaque dourada · 1º semestre),
  título da campanha **Diamante 2026**, descrição, detalhes com ícones
  (encerra em 30 jun 2026 · top 30 corretores) e CTAs
  ("Participar pelo painel" + "Ver regulamento").
- **Lado direito (painel azul):** marca d'água de troféu, rótulo "Prêmio",
  valor do prêmio (**Viagem + R$ 5.000**), **contagem regressiva** ("Faltam 29 dias")
  e critérios de elegibilidade.

---

## Sistema visual

| Token | Uso |
|-------|-----|
| `--brand` / `--brand-deep` / `--brand-darker` | Degradês de hero, painel da campanha, CTAs sólidos |
| `--brand-soft` | Tags e filtro ativo |
| `--ink` / `--ink-2` / `--ink-3` | Hierarquia de texto |
| `--line` / `--line-soft` | Bordas de cards, separadores, masthead |
| `--bg-2` | Trilho dos filtros, tags neutras |
| `--shadow-sm` | Filtro ativo e cards |
| `#7BE0B5` (verde-menta) | Acento de destaque (dot do eyebrow, *itálico* do título) |
| Dourado `rgba(212,175,55,…)` | Tag "Em destaque" da campanha premium |

- **Tipografia:** **Manrope** (400–800) para UI e texto corrido; **Fraunces**
  (itálico, optical 144) só no trecho editorial em destaque do hero ("em um só lugar").
- **Forma:** raios generosos (cards 24px, pills 999px), sombras suaves e azuladas,
  fundo branco com seções respiradas (96px de padding vertical).
- **Tom:** corporativo-acolhedor — mesma linguagem do site e dos painéis.

---

## Interação

- **Filtros do feed** (JS): alternam a classe `active` e exibem/ocultam os cards
  por `data-tipo` (`noticia` / `campanha` / `aviso`); o card de campanha em
  destaque (`data-group="destaque"`) aparece só em "Tudo" e "Campanhas".
- **Masthead sticky** com efeito de vidro (blur + saturação) no scroll.
- Hovers consistentes: pills, cards (elevação) e botões (translateY).

---

## Responsividade

- Card de campanha colapsa para 1 coluna em ≤880px.
- Navegação vira `nav-toggle` (hambúrguer) em ≤1080px.
- Topband esconde itens secundários em ≤780px; marca reduz em ≤560px.
- Hero usa `clamp()` para escalar título (38→68px) e seções (28→42px).

---

## Notas de integração

- A folha de estilo foi corrigida de `app.css` para **`css/app.css`** (path real do
  projeto), garantindo que a página renderize na galeria e em tela cheia.
- Os links internos do menu/CTA foram remapeados dos nomes provisórios
  (`Home.html`, `Login 1.html`, `Operadoras.html`, `Numeros.html`…) para os
  arquivos reais (`home.html`, `login-1.html`, `CorClub Operadoras - standalone.html`,
  `CorClub Vantagens - standalone.html`, `painel-*.html`).
  **`Numeros.html` não existe no projeto** — esses links apontam provisoriamente
  para `home.html`. Definir se vale criar a página "Números" ou remover o item do menu.
