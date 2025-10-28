#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$ROOT_DIR/tmp/dev-server.pid"

if [[ ! -f "$PID_FILE" ]]; then
  echo "No running dev server found."
  exit 0
fi

PID="$(cat "$PID_FILE")"

if ps -p "$PID" > /dev/null 2>&1; then
  echo "Stopping Next.js dev server (PID $PID)..."
  kill "$PID" >/dev/null 2>&1 || true
  for _ in {1..20}; do
    if ps -p "$PID" > /dev/null 2>&1; then
      sleep 0.25
    else
      break
    fi
  done
else
  echo "Process $PID not running."
fi

rm -f "$PID_FILE"
echo "Next.js dev server stopped."
