# Design

- [MDN - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [WCAG 2.2 - Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)

## Uso

- Referência de design para os projetos do front
- Sem código: só indicação e link oficial

## Referências

| Assunto | Indicação | Referência |
|---|---|---|
| Tokens | Cor, espaçamento e raio em variáveis CSS; Tailwind `@theme` | [Tailwind - Theme](https://tailwindcss.com/docs/theme) · [MDN - Custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) |
| Tipografia | Fonte do sistema por padrão; web font com `font-display: swap` | [Google Fonts](https://fonts.google.com) · [MDN - font-display](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display) |
| Cor | Paleta em OKLCH; contraste mínimo 4.5:1 | [MDN - oklch()](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch) · [WCAG - Contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) |
| Layout | Grid para página, Flexbox para linha, container query para componente | [MDN - Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout) · [MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout) · [MDN - Container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_size_and_style_queries) |
| Glifos | SVG por componente em produção; fonte de ícones só em protótipo | [Lucide](https://lucide.dev) · [Material Symbols](https://fonts.google.com/icons) |
| Componentes | Copiar só o componente em uso | [shadcn/ui](https://ui.shadcn.com) |
| Acessibilidade | Foco visível, respeitar movimento reduzido e tema do sistema | [MDN - :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) · [MDN - prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion) · [MDN - prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) |

## Indicações

- Defina tokens antes de componentes: componente usa token, nunca valor solto
- Nomeie tokens pelo papel (`primary`, `credit`, `debit`), não pela cor (`green-700`)
- Mobile first: estilo base no menor tamanho, `min-width` para crescer
- Use `rem` para tipografia e espaçamento; `px` só para borda
- Teste contraste e navegação por teclado antes de publicar
- Suporte tema claro e escuro pelos mesmos tokens

## Relacionados

- [Tailwind](../tailwind)
- [shadcn/ui](../shadcn)
- [Astro](../astro)
