# 🛠️ Technical Specification

This document details the technology stack and architectural decisions for the **Secrets** project.

## 🏗️ Backend Stack

- **Language:** Java 21 (LTS)
- **Framework:** Spring Boot 3.3.0
- **Security:** Spring Security (Stateless JWT, OAuth2)
- **Database:** MongoDB (using Spring Data MongoDB)
- **Messaging:** Java Mail Sender (for OTP verification)
- **Build Tool:** Maven
- **Core Dependencies:**
  - `spring-boot-starter-web`: For RESTful APIs.
  - `spring-boot-starter-security`: For Auth/Authorization.
  - `jjwt`: For JSON Web Token implementation.
  - `lombok`: To reduce boilerplate code.

## 🎨 Frontend Stack

- **Framework:** Angular 18 (Standalone Components)
- **Language:** TypeScript
- **State Management:** RxJS (Observables/Subjects)
- **Styling:** 
  - Bootstrap 5 (Responsive Layouts)
  - FontAwesome 5 (Iconography)
  - Bootstrap-Social (OAuth UI components)
- **Routing:** Angular Router with Auth Guards.
- **HTTP Client:** Angular HttpClient with Auth Interceptors for JWT attachment.

## 💾 Database & Storage

- **Database:** MongoDB
- **Pattern:** Document-based storage.
- **Schema Strategy:** Embedded secrets within the User document for high-read performance and simplified relationships.

## 🔐 Authentication Flow

1. **Local Auth:** 
   - User registers with Email/OTP.
   - Login generates a JWT signed with a secret key.
   - JWT is stored in the browser's LocalStorage.
2. **Social Auth:** 
   - Google OAuth2 flow handled by Spring Security.
   - Successful redirection provides a JWT to the frontend.
3. **Authorization:** 
   - All protected endpoints require a `Bearer <JWT>` token in the `Authorization` header.

## 🚀 Deployment & DevOps

- **Version Control:** Git
- **Configuration:** Environment variables for sensitive secrets (Google Client ID/Secret).
- **Environment:** Compatible with Docker and standard cloud providers (Heroku, AWS, DigitalOcean).
