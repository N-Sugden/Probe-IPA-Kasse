# Backend für Probe-IPA-Kasse

## Setup

1. Installiere Dependencies: `npm install`
2. Baue das Projekt: `npm run build`
3. Setze Environment Variables in `.env`:
   - `AZURE_CLIENT_ID`: Deine Azure App Client ID
   - `AZURE_CLIENT_SECRET`: Deine Azure App Client Secret
   - `AZURE_TENANT_ID`: Deine Azure Tenant ID
   - `JWT_SECRET`: Ein sicherer JWT Secret
4. Starte die Datenbank: `docker-compose up -d`
5. Starte den Server: `npm start` oder `npm run dev`

## API Endpoints

### Auth
- `GET /auth/login`: Microsoft Login
- `GET /auth/callback`: Callback nach Login
- `POST /auth/logout`: Logout

### Balance
- `GET /api/balance/balance`: Guthaben abrufen (auth erforderlich)
- `POST /api/balance/deposit`: Aufladen (auth erforderlich)
- `POST /api/balance/withdraw`: Abbuchen (auth erforderlich)
- `GET /api/balance/all-balances`: Alle Guthaben (Admin erforderlich)

### History
- `GET /api/history/history`: Transaktionshistorie (auth erforderlich)
- `GET /api/history/all-history`: Alle Transaktionen (Admin erforderlich)

## Azure AD Setup

Erstelle eine App Registration in Azure AD:
- Redirect URI: `http://localhost:3000/auth/callback`
- Scopes: openid, profile, email