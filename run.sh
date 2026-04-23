#!/bin/bash
# CLEAR Website Launcher

SERVER_FILE="$HOME/clear-website/server.py"
PID_FILE="$HOME/clear-website/server.pid"

echo "🚀 Starting CLEAR Website..."

# Check if already running
if [ -f "$PID_FILE" ]; then
    PID=$(cat "$PID_FILE")
    if ps -p $PID > /dev/null 2>&1; then
        echo "⚠️  Server already running (PID: $PID)"
        echo "Stop with: ./stop.sh"
        exit 0
    fi
fi

# Start server in background
cd ~/clear-website
nohup python3 server.py > ~/clear-website/server.log 2>&1 &
echo $! > "$PID_FILE"

sleep 2

# Check if running
if ps -p $(cat "$PID_FILE") > /dev/null 2>&1; then
    echo ""
    echo "✅ CLEAR Website is running!"
    echo ""
    echo "🌐 Access: http://localhost:8080"
    echo "🔐 Credentials:"
    cat ~/clear-website/.credentials
    echo ""
    echo "📄 Logs: tail -f ~/clear-website/server.log"
    echo "🛑 Stop: ./stop.sh"
else
    echo "❌ Failed to start server"
    cat ~/clear-website/server.log
    exit 1
fi
