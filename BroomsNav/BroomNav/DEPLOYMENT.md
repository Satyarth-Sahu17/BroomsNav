# 🚀 BroomNav Deployment Guide

## Local Development

### Windows:
```bash
# Option 1: Double-click start.bat
# Option 2: Run in terminal
npm start
```

### Mac/Linux:
```bash
npm start
```

## Production Deployment

### Option 1: Heroku (Easiest)

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create broomnav-app`
4. Set env variables:
```bash
heroku config:set JWT_SECRET=your-super-secret-key
heroku config:set NODE_ENV=production
```
5. Deploy:
```bash
git init
git add .
git commit -m "Initial commit"
git push heroku main
```
6. Open: `heroku open`

### Option 2: Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Deploy: `vercel`
3. Follow prompts
4. Set environment variables in Vercel dashboard

### Option 3: Railway

1. Go to railway.app
2. Connect GitHub repo
3. Deploy automatically
4. Set environment variables

### Option 4: DigitalOcean/AWS/Azure

1. Create a droplet/instance
2. Install Node.js
3. Clone repo
4. Run: `npm install`
5. Use PM2 for process management:
```bash
npm install -g pm2
pm2 start server.js
pm2 startup
pm2 save
```
6. Set up Nginx as reverse proxy
7. Get SSL certificate (Let's Encrypt)

## Database Integration

### Firebase (Recommended for quick setup)

1. Create Firebase project
2. Enable Realtime Database or Firestore
3. Get service account key
4. Update server.js:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-project.firebaseio.com"
});

const db = admin.database();
```

### MongoDB Atlas

1. Create cluster at mongodb.com/atlas
2. Get connection string
3. Install: `npm install mongodb`
4. Update server.js with connection

## Environment Variables

Create `.env` file:
```
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this
NODE_ENV=production
MONGODB_URI=your-mongodb-connection-string
FIREBASE_DATABASE_URL=your-firebase-url
```

## SSL/HTTPS Setup

### Using Nginx:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Performance Optimization

1. **Enable Gzip**: Already included in server.js (compression)
2. **Caching**: Configure browser caching
3. **CDN**: Use Cloudflare for static assets
4. **Image Optimization**: Optimize icons
5. **Minification**: Minify CSS/JS for production

## Security Checklist

- [ ] Change JWT_SECRET to strong random value
- [ ] Enable HTTPS
- [ ] Add rate limiting (express-rate-limit)
- [ ] Sanitize user inputs
- [ ] Add CORS restrictions
- [ ] Implement proper session management
- [ ] Add CSP headers
- [ ] Regular dependency updates
- [ ] Database access restrictions
- [ ] Environment variables secured

## Monitoring

### Using PM2:
```bash
pm2 monit
pm2 logs
```

### Health Check Endpoint:
Already included: `GET /api/health`

## Backup Strategy

1. Regular database backups
2. User reports export
3. Configuration backups

## Scaling

1. Use load balancer (Nginx/HAProxy)
2. Multiple server instances
3. Redis for session management
4. CDN for static assets
5. Database read replicas

## Custom Domain

1. Purchase domain (Namecheap, GoDaddy)
2. Point A record to server IP
3. Configure DNS
4. Set up SSL

## Mobile App Development

### Progressive Web App (Current):
- Already implemented
- Works on iOS and Android
- Installable from browser

### Native App (Future):
- React Native
- Flutter
- Cordova/Capacitor

## API Documentation

Document your API using:
- Swagger/OpenAPI
- Postman collections
- Markdown docs

## Updates & Maintenance

1. Regular dependency updates: `npm update`
2. Security patches: `npm audit fix`
3. Monitor server logs
4. User feedback integration
5. Feature roadmap

---

**Need help? Check README.md or open an issue\!**
