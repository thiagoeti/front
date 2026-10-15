#!/bin/sh
cd "$(dirname "$0")"
docker run \
  -d \
  --name next-app-router \
  --restart always \
  --init \
  -m 1g \
  --memory-swap 1g \
  --cpus 2 \
  --pids-limit 128 \
  --ulimit nofile=65536:65536 \
  --sysctl net.core.somaxconn=1024 \
  --user node \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --read-only \
  --tmpfs /tmp \
  --health-cmd 'wget -qO /dev/null http://127.0.0.1:3000/api/quote' \
  --health-interval 10s \
  --health-timeout 3s \
  --health-retries 3 \
  --health-start-period 180s \
  --stop-signal SIGTERM \
  --stop-timeout 10 \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  -e HOME=/home/node \
  -e NODE_ENV=production \
  -e NEXT_TELEMETRY_DISABLED=1 \
  -e NODE_OPTIONS=--max-old-space-size=512 \
  -e UV_THREADPOOL_SIZE=2 \
  -e HOSTNAME=0.0.0.0 \
  -e PORT=3000 \
  -e KEEP_ALIVE_TIMEOUT=65000 \
  -p 3000:3000 \
  -v /home/node \
  -v "$PWD:/src:ro" \
  -w /home/node \
  node:24-alpine \
  sh \
  -c '
  npx --yes create-next-app@16.4.0 app --ts --tailwind --app --no-src-dir --no-linter --no-react-compiler \
    --no-agents-md --import-alias "@/*" --use-npm --skip-install --disable-git --yes && cd app &&
  rm -f next.config.ts && cp -r /src/package.json /src/package-lock.json /src/next.config.mjs /src/postcss.config.mjs /src/tsconfig.json /src/app /src/lib . &&
  npm ci --include=dev --no-audit --no-fund && npm run build &&
  cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/ &&
  exec node .next/standalone/server.js'
