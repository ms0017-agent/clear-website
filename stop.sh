#!/bin/bash
# CLEAR Website Stopper

PID_FILE="$HOME/clear-website/server.pid"

echo "🛑 Stopping CLEAR Website..."

if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        kill $PID
        echo "✅ Server stopped (was PID: $PID)"
    else
        echo "⚠️  Server not running"
    fi
    rm "$PID_FILE"
else
    echo "⚠️  No PID file found"
fi

# Kill any remaining Python server processes
pkill -f "python3.*server.py" 2>/dev/null

echo "✅ CLEAR Website stopped"
