# Tailwind

[Tailwind](https://tailwindcss.com)
[Tailwind - Docs](https://tailwindcss.com/docs)

## Uso

- Tailwind v4 sempre ultima versão
- CDN (unpkg) em desenvolvimento e protótipo
- Compilado no build em produção

## Diagrama

```mermaid
flowchart LR
  subgraph CDN ["CDN unpkg — desenvolvimento e protótipo"]
    H[HTML com classes] --> B["@tailwindcss/browser"]
    S["style type=text/tailwindcss<br/>@theme"] --> B
    B --> R[CSS gerado em runtime<br/>e injetado no head]
  end
  subgraph Build ["Build — produção"]
    F[arquivos de @source] --> C[Vite, PostCSS ou CLI]
    T["app.css<br/>@import + @theme"] --> C
    C --> O[CSS estático minificado]
  end
```

## Chamada

```html
<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script src="https://unpkg.com/@tailwindcss/browser@latest"></script>
  <style type="text/tailwindcss">
    @theme {
      --color-ink: #0f172a;
      --color-credit: #15803d;
      --color-debit: #b91c1c;
    }
  </style>
</head>
<body class="font-sans p-6 text-ink">
  ...
</body>
</html>
```

## Como funciona

1. `@tailwindcss/browser` lê as classes do DOM e gera o CSS no navegador
2. `MutationObserver` regenera o CSS a cada classe nova
3. `<style type="text/tailwindcss">` aceita `@theme`, `@utility`, `@variant` e `@apply`
4. `@theme` cria os tokens: `--color-credit` vira `text-credit`, `bg-credit`, `border-credit`

## Caminhos de desenvolvimento

| Caminho | Quando usar | Chamada |
|---|---|---|
| CDN unpkg | Desenvolvimento e protótipo | `<script src="https://unpkg.com/@tailwindcss/browser@latest">` |
| Vite | Produção: Vite, Vue, React, Svelte | `npm i tailwindcss @tailwindcss/vite` |
| Astro | Produção: Astro | `npx astro add tailwind` |
| PostCSS | Produção: Next.js, webpack | `npm i tailwindcss @tailwindcss/postcss` |
| CLI | Produção: NestJS com views, site estático sem bundler | `npx @tailwindcss/cli -i app.css -o dist/app.css --minify` |

## Boas práticas

- `@latest` segue a versão mais recente; para travar, use a versão exata (`@4.3.3`)
- Use o CDN só em desenvolvimento: em produção, gere CSS estático no build
- Declare tokens semânticos em `@theme` (`credit`, `debit`), não cores soltas (`#15803d`)
- Escreva a classe inteira no código: `text-${cor}` não é detectado no build
- No build, use `@import "tailwindcss" source(none)` e `@source` para limitar a varredura
- Feche o tema com `--*: initial` dentro de `@theme` para gerar só os tokens declarados

## Trade-offs

| Caminho | Vantagem | Desvantagem |
|---|---|---|
| CDN | Zero instalação, resultado imediato | JS no navegador, CSS em runtime, flash sem estilo |
| Build | CSS mínimo, estático e cacheável | Exige toolchain; classe fora do `@source` não é gerada |
