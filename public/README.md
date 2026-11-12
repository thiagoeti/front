# Public

- [Elysia](https://elysiajs.com)
- [Astro](https://astro.build)

## Uso

- `project/` reúne os arquivos que compõem o projeto público: cada um cumpre uma função
- Elysia no Bun serve o build estático do Astro e a pasta `dist/` e `public/` na raiz `/`
- Container `oven/bun` configurado por `.env`

## Arquivos

| Arquivo | Destino | Função |
|---|---|---|
| `.env` | `.env` | Configuração do container e do servidor: `GROUP`, `PROJECT` e `PORT` |
| `docker.sh` | `docker.sh` | Valida o `.env`, recria o container `GROUP_PROJECT` e monta os repositórios locais em `/repos` (somente leitura), se existirem |
| `run.sh` | `run.sh` | Instala se faltar, limpa `.astro/` e `dist/`, roda `astro build`, copia `public/` para `dist/` e sobe o servidor |
| `install.sh` | `install.sh` | `bun init` e dependências: Elysia (`cors`, `static`) e Astro (`sitemap`, Tailwind, `check`, TypeScript) |
| `app/index.ts` | `app/index.ts` | Servidor Elysia: CORS `*`, `/health`, `/` e estáticos de `dist/` e `public/` |

## .env

| Variável | Uso |
|---|---|
| `GROUP` | Grupo: início do nome do container |
| `PROJECT` | Projeto: fim do nome do container |
| `PORT` | Porta do container e do Elysia |

Todas são obrigatórias: `docker.sh` aborta se faltar alguma e `index.ts` exige `PORT`.

## Executar

```sh
./docker.sh
curl localhost:3000/health
```

Sem Docker: `sh run.sh`.

## Rotas

| Rota | Resposta |
|---|---|
| `GET /health` | `ok` |
| `GET /` | `dist/index.html` |
| `GET /*` | Arquivo de `dist/` ou `public/` |
