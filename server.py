#!/usr/bin/env python3
"""
CLEAR Website Server
Secure HTTP server with Basic Authentication
"""

import http.server
import socketserver
import base64
import os
import sys
from functools import wraps

# Configuration
PORT = 8080
DIRECTORY = os.path.join(os.path.expanduser("~"), "clear-website")
HTPASSWD_FILE = os.path.join(DIRECTORY, ".htpasswd")

# Credentials (from .htpasswd)
USERNAME = "clear-admin"
# Password hash is stored, we'll validate against it
PASSWORD_HASH = None

def load_credentials():
    """Load credentials from .htpasswd file"""
    global PASSWORD_HASH
    try:
        with open(HTPASSWD_FILE, 'r') as f:
            line = f.readline().strip()
            if line:
                parts = line.split(':')
                if len(parts) == 2:
                    return parts[0], parts[1]
    except Exception as e:
        print(f"Warning: Could not load credentials: {e}")
    return None, None

class BasicAuthHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP handler with Basic Authentication"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def check_auth(self, auth_header):
        """Validate Basic Auth credentials"""
        if not auth_header or not auth_header.startswith('Basic '):
            return False
        
        try:
            encoded = auth_header[6:]
            decoded = base64.b64decode(encoded).decode('utf-8')
            username, password = decoded.split(':', 1)
            
            # Load actual password from credentials file
            with open(os.path.join(DIRECTORY, '.credentials'), 'r') as f:
                content = f.read()
                for line in content.split('\n'):
                    if line.startswith('Password:'):
                        stored_password = line.replace('Password:', '').strip()
                        return username == USERNAME and password == stored_password
        except Exception as e:
            print(f"Auth error: {e}")
        
        return False
    
    def send_auth_request(self):
        """Send 401 Unauthorized response"""
        self.send_response(401)
        self.send_header('WWW-Authenticate', 'Basic realm="CLEAR Website"')
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(b'<html><body><h1>401 Unauthorized</h1><p>Password required to access CLEAR website.</p></body></html>')
    
    def do_GET(self):
        """Handle GET requests with authentication"""
        # Skip auth for health check
        if self.path == '/health':
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'OK')
            return
        
        # Check authentication
        auth_header = self.headers.get('Authorization')
        if not self.check_auth(auth_header):
            self.send_auth_request()
            return
        
        # Serve the file
        super().do_GET()
    
    def log_message(self, format, *args):
        """Custom log format"""
        sys.stderr.write(f"[CLEAR Server] {self.address_string()} - {format % args}\n")

class ReuseAddrTCPServer(socketserver.TCPServer):
    """TCP server with address reuse enabled"""
    allow_reuse_address = True

def run_server():
    """Start the CLEAR website server"""
    # Verify directory exists
    if not os.path.exists(DIRECTORY):
        print(f"Error: Directory {DIRECTORY} not found!")
        sys.exit(1)
    
    # Verify index.html exists
    if not os.path.exists(os.path.join(DIRECTORY, 'index.html')):
        print(f"Error: index.html not found in {DIRECTORY}!")
        sys.exit(1)
    
    # Load credentials
    user, pwd_hash = load_credentials()
    if not user:
        print("Warning: Could not load credentials from .htpasswd")
    
    # Create server with address reuse
    with ReuseAddrTCPServer(("", PORT), BasicAuthHandler) as httpd:
        print(f"")
        print(f"╔══════════════════════════════════════════════╗")
        print(f"║       CLEAR Website Server Started          ║")
        print(f"╠══════════════════════════════════════════════╣")
        print(f"║  Port:        {PORT:<30} ║")
        print(f"║  Directory:   {DIRECTORY:<30} ║")
        print(f"║  Protected:   Yes (Basic Auth)              ║")
        print(f"║  Credentials: cat ~/clear-website/.credentials ║")
        print(f"╚══════════════════════════════════════════════╝")
        print(f"")
        print(f"Access the website at: http://localhost:{PORT}")
        print(f"Press Ctrl+C to stop the server")
        print(f"")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n🛑 Server stopped by user")
            sys.exit(0)

if __name__ == "__main__":
    run_server()
