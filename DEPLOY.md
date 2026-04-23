# CLEAR Website Deployment

## 🔐 Access Credentials

View credentials: `cat ~/clear-website/.credentials`

## 🚀 Quick Start

### Start the Website
```bash
cd ~/clear-website
./run.sh
```

### Stop the Website
```bash
cd ~/clear-website
./stop.sh
```

## 📋 Manual Setup

1. **Test nginx configuration:**
```bash
nginx -t -c ~/clear-website/nginx-clear.conf
```

2. **Start nginx directly (testing):**
```bash
nginx -c ~/clear-website/nginx-clear.conf
```

3. **Set up systemd (production):**
```bash
sudo cp ~/clear-website/clear-website.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable clear-website
sudo systemctl start clear-website
```

## ✅ Verify Installation

```bash
# Check status
sudo systemctl status clear-website

# Test locally
curl http://localhost
```

## 🌐 Access

- **URL:** http://&lt;your-gcp-external-ip&gt;
- **Auth:** HTTP Basic Authentication
- **Username:** clear-admin

## 🔒 Security Features

- HTTP Basic Auth (password protected)
- SHA-512 password hashing
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- Gzip compression enabled

## 📁 Files

- `index.html` - Main website
- `styles.css` - Styling (13KB)
- `script.js` - Interactivity (4KB)
- `.htpasswd` - Password file
- `nginx-clear.conf` - Web server config
- `clear-website.service` - systemd service
- `run.sh` / `stop.sh` - Management scripts
