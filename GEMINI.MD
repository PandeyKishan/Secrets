# Project Secrets: Architecture & Conventions

This project has been migrated from a Node.js/Express/EJS stack to a modern Spring Boot and Angular architecture.

## Tech Stack
- **Backend:** Java Spring Boot 3.3.0 (Java 21, Maven)
- **Frontend:** Angular 18+ (Standalone Components)
- **Database:** MongoDB (`user1DB`)
- **Styling:** Bootstrap 5, FontAwesome, Bootstrap-Social

## Architecture
- **Monorepo Structure:**
  - `/backend`: Spring Boot application.
  - `/frontend`: Angular SPA.
  - `/legacy`: Original Node.js/EJS source code (for reference).
- **Authentication:** Stateless JWT (JSON Web Tokens).
  - Local Login/Register: `/api/auth/**`
  - Google OAuth2: Handled via Spring Security. Successful login redirects to frontend with a JWT.
- **Security:**
  - Backend uses `WebSecurityConfig` for CORS, CSRF disable (stateless), and JWT filters.
  - Frontend uses `AuthInterceptor` to automatically attach Bearer tokens to API requests.

## Key API Endpoints
- `POST /api/auth/register`: Local registration.
- `POST /api/auth/login`: Local login, returns JWT.
- `GET /api/public/secrets`: Fetch secrets for unauthenticated users.
- `GET /api/secrets`: Fetch secrets for authenticated users.
- `POST /api/secrets/submit`: Submit a new secret (authenticated).

## Development Guidelines
- **Backend:** Run with `./mvnw spring-boot:run` in the `backend` folder. Requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` environment variables.
- **Frontend:** Run with `npm start` in the `frontend` folder. Connects to backend at `http://localhost:8080`.
- **UI:** Maintain the minimalist, aesthetic "Secrets" theme using Bootstrap classes and centered layouts.
