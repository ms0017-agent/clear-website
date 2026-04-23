# Making CLEAR Website Publicly Accessible

## Current Status
✅ Website is running on port 8080
✅ Instance firewall allows port 8080
❌ GCP Cloud Firewall blocks external traffic

## Option 1: Add GCP Firewall Rule (Recommended)

Run this command in your GCP console or Cloud Shell:

```bash
gcloud compute firewall-rules create clear-website-8080 \
  --allow tcp:8080 \
  --source-ranges 0.0.0.0/0 \
  --description "Allow external access to CLEAR website" \
  --network default
```

**Then access:** http://35.236.39.82:8080

### Via GCP Console:
1. Go to: https://console.cloud.google.com/networking/firewall/list
2. Click "CREATE FIREWALL RULE"
3. Settings:
   - Name: `clear-website-8080`
   - Network: `default`
   - Priority: `1000`
   - Direction: `Ingress`
   - Action: `Allow`
   - Targets: `All instances in the network`
   - Source filter: `IPv4 ranges`
   - Source IP ranges: `0.0.0.0/0`
   - Protocols: Check `TCP`, enter `8080`
4. Click "CREATE"

## Option 2: Use ngrok (No GCP changes needed)

1. Get free authtoken: https://dashboard.ngrok.com/get-started/your-authtoken
2. Run:
```bash
~/bin/ngrok authtoken YOUR_TOKEN_HERE
~/bin/ngrok http 8080
```
3. Share the ngrok URL (e.g., `https://abc123.ngrok-free.app`)

## Option 3: Deploy to Vercel/Netlify

I can help you deploy to these platforms for free HTTPS hosting.

## Credentials (for all options)
- **Username:** clear-admin
- **Password:** XqTcRan6SGNWoQpo
