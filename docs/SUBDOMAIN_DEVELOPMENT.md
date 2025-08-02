# Subdomain-Based POS System Development

## Development Setup for Subdomain Testing

Since the POS system is subdomain-based (e.g., `store1.pos.com`, `shop2.pos.com`), you need to test subdomains locally.

### Option 1: URL Parameters (Recommended for Development)
The system automatically detects localhost and allows using URL parameters:
```
http://localhost:5174/?org=demo
http://localhost:5174/login?org=mystore
```

### Option 2: Local DNS (hosts file)
Edit your `/etc/hosts` file (Linux/Mac) or `C:\Windows\System32\drivers\etc\hosts` (Windows):
```
127.0.0.1 localhost
127.0.0.1 demo.localhost
127.0.0.1 mystore.localhost
127.0.0.1 test.localhost
```

Then access:
```
http://demo.localhost:5174
http://mystore.localhost:5174
```

### Option 3: Development Domains
Use services like:
- `nip.io`: `demo.127.0.0.1.nip.io:5174`
- `xip.io`: `demo.127.0.0.1.xip.io:5174`

## Testing Flow

### 1. Main Domain (Landing/Signup)
- Visit: `http://localhost:5174`
- Should show: Landing page with signup option
- Signup creates organization and redirects to subdomain

### 2. Organization Subdomain (Login/App)
- Visit: `http://localhost:5174/login?org=demo`
- Should show: Login page with organization name
- Login redirects to `/app/pos`

### 3. App Routes (Protected)
- Visit: `http://localhost:5174/app/pos?org=demo`
- Should show: POS interface (after authentication)

## URL Structure

### Main Domain (pos.com)
- `/` - Landing page
- `/signup` - Organization creation
- `/login` - Only if no subdomain (redirects to main)

### Organization Subdomain (store1.pos.com)
- `/` - Redirects to main domain
- `/login` - Organization login
- `/app/*` - Protected application routes

## Environment Variables
Consider adding to `.env`:
```
VITE_MAIN_DOMAIN=pos.com
VITE_DEV_SUBDOMAIN=demo
```
