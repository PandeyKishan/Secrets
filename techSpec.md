# 🛠️ Technical Specification

Explore the engine behind **Secrets**. This document outlines our modern, scalable, and secure architecture.

---

## 🏗️ System Architecture

```mermaid
graph TD
    subgraph "Frontend (Angular 18)"
        A[App Components] --> B[Auth Interceptor]
        B --> C[HttpClient]
    end

    subgraph "Backend (Spring Boot 3.3)"
        C -- "REST API (JSON + JWT)" --> D[Security Filter Chain]
        D --> E[REST Controllers]
        E --> F[Service Layer]
        F --> G[Repositories]
    end

    subgraph "External"
        G --> H[(MongoDB)]
        F --> I[Java Mail Sender]
        D --> J[Google OAuth2]
    end

    style A fill:#f9f,stroke:#333,stroke-width:2px
    style E fill:#bbf,stroke:#333,stroke-width:2px
    style H fill:#bfb,stroke:#333,stroke-width:2px
```

---

## 💻 Tech Stack Breakdown

### **Frontend: The User Experience**
| Technology | Badge | Purpose |
| :--- | :--- | :--- |
| **Angular 18** | ![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat-square&logo=angular&logoColor=white) | Standalone components & modular architecture. |
| **TypeScript** | ![TS](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Type-safe development. |
| **RxJS** | ![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=flat-square&logo=reactivex&logoColor=white) | Reactive state management. |
| **Bootstrap 5** | ![BS](https://img.shields.io/badge/Bootstrap-7952B3?style=flat-square&logo=bootstrap&logoColor=white) | Responsive design & layout. |

### **Backend: The Logic Engine**
| Technology | Badge | Purpose |
| :--- | :--- | :--- |
| **Java 21** | ![Java](https://img.shields.io/badge/Java-ED8B00?style=flat-square&logo=openjdk&logoColor=white) | Latest LTS performance features. |
| **Spring Boot 3** | ![Spring](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=spring-boot&logoColor=white) | Production-ready microservice foundation. |
| **Spring Security** | ![Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=flat-square&logo=spring-security&logoColor=white) | JWT & OAuth2 orchestration. |
| **MongoDB** | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white) | Flexible NoSQL document storage. |

---

## 🔐 Authentication Data Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant Google

    User->>Frontend: Clicks "Login with Google"
    Frontend->>Backend: Redirects to /oauth2/authorization/google
    Backend->>Google: Authorization Request
    Google-->>Backend: Auth Code
    Backend->>Google: Exchange Code for Token
    Backend-->>Frontend: Redirect with JWT in URL
    Frontend->>Frontend: Store JWT in LocalStorage
```

---

## 🚀 Key Performance Highlights
- **Statelessness:** No server-side sessions; perfect for horizontal scaling.
- **Async Processing:** OTP emails are sent asynchronously to ensure fast UI response.
- **Type Safety:** Shared DTO structures ensure consistency between Java and TypeScript.
