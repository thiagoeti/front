#!/bin/sh
cd "$(dirname "$0")"
docker run \
  --rm \
  --name astro \
  --restart always \
  --init \
  -m 512m \
  --memory-swap 512m \
  --cpus 1 \
  --pids-limit 64 \
  --ulimit nofile=65536:65536 \
  --user bun \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --read-only \
  --tmpfs /tmp:exec \
  --health-cmd 'wget -qO /dev/null http://127.0.0.1:4321/' \
  --health-interval 10s \
  --health-timeout 3s \
  --health-retries 3 \
  --health-start-period 120s \
  --stop-signal SIGTERM \
  --stop-timeout 10 \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  -e HOME=/home/bun \
  -e NODE_ENV=production \
  -e ASTRO_TELEMETRY_DISABLED=1 \
  -e HOST=0.0.0.0 \
  -e PORT=4321 \
  -p 4321:4321 \
  -v /home/bun \
  -v "$PWD:/src:ro" \
  -w /home/bun \
  oven/bun:1.3-alpine \
  sh \
  -c '
  bun create astro@5.2.6 site --template minimal --no-install --no-git --no-ai --skip-houston --yes && cd site &&
  cp -r /src/package.json /src/bun.lock /src/astro.config.mjs /src/tsconfig.json /src/src . &&
  bun install --frozen-lockfile --no-cache && bun run build && exec bun run start'
