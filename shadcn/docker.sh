#!/bin/sh
cd "$(dirname "$0")"
# Build: the Vite skeleton with the project files on top; dist lands in the shadcn-build volume.
docker run \
  --rm \
  --name shadcn-build \
  -m 1g \
  --memory-swap 1g \
  --cpus 1 \
  --pids-limit 64 \
  --user bun \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --read-only \
  --tmpfs /tmp:exec \
  -e HOME=/home/bun \
  -e NODE_ENV=production \
  -v shadcn-build:/home/bun \
  -v "$PWD:/src:ro" \
  -w /home/bun \
  oven/bun:1.3-alpine \
  sh \
  -c '
  rm -rf site && bun create vite@9.2.1 site --template react-ts --no-interactive --no-immediate && cd site &&
  cp -r /src/package.json /src/bun.lock /src/vite.config.ts /src/tsconfig.json /src/index.html /src/components.json /src/src . &&
  bun install --frozen-lockfile --no-cache && bun run build' &&
# Serve: nginx with the dist read-only; the root master only keeps the capabilities to drop the workers to nginx.
docker run \
  -d \
  --name shadcn \
  --restart always \
  -m 64m \
  --memory-swap 64m \
  --cpus 1 \
  --pids-limit 32 \
  --ulimit nofile=16384:16384 \
  --cap-drop ALL \
  --cap-add CHOWN \
  --cap-add SETGID \
  --cap-add SETUID \
  --security-opt no-new-privileges \
  --read-only \
  --tmpfs /var/cache/nginx:size=16m \
  --tmpfs /run:size=1m \
  --tmpfs /etc/nginx/conf.d:size=1m \
  --health-cmd 'wget -qO /dev/null http://127.0.0.1:8080/' \
  --health-interval 10s \
  --health-timeout 3s \
  --health-retries 3 \
  --health-start-period 5s \
  --stop-signal SIGQUIT \
  --stop-timeout 15 \
  --log-driver json-file \
  --log-opt max-size=10m \
  --log-opt max-file=3 \
  -e HOST=0.0.0.0 \
  -e PORT=8080 \
  -p 4173:8080 \
  -v shadcn-build:/srv:ro \
  -v "$PWD/nginx/nginx.conf:/etc/nginx/nginx.conf:ro" \
  -v "$PWD/nginx/default.conf.template:/etc/nginx/templates/default.conf.template:ro" \
  nginx:1.27-alpine
