# Deployment

## Local production
```bash
npm install
npm run build
npm start
```

## Docker
```bash
docker compose up --build
```

## Vercel
The application can deploy to Vercel, but SQLite persistence requires an alternative durable storage strategy. Portfolio/demo mode remains suitable for stateless deployment.
