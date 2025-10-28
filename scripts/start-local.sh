#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$ROOT_DIR/tmp/dev-server.pid"
LOG_FILE="$ROOT_DIR/tmp/dev-server.log"

mkdir -p "$ROOT_DIR/tmp"

if [[ -f "$PID_FILE" ]]; then
  EXISTING_PID="$(cat "$PID_FILE")"
  if ps -p "$EXISTING_PID" > /dev/null 2>&1; then
    echo "Next.js dev server already running (PID $EXISTING_PID)."
    echo "Logs: $LOG_FILE"
    exit 0
  fi
  rm -f "$PID_FILE"
fi

echo "Starting Next.js dev server..."
(
  cd "$ROOT_DIR"
  nohup npm run dev > "$LOG_FILE" 2>&1 &
  echo $! > "$PID_FILE"
)

PID="$(cat "$PID_FILE")"
echo "Next.js dev server started (PID $PID)."
echo "Logs: $LOG_FILE"
