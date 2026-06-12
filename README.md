# 🔐 Secrets

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.3.0-brightgreen.svg)
![Angular](https://img.shields.io/badge/Angular-18-red.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)

> **Don't keep your secrets, share them anonymously!**

Secrets is a modern, full-stack web application designed for users to share their deepest thoughts and secrets anonymously. Migrated from a legacy Node.js/EJS stack, this project now leverages the power of **Spring Boot 3** and **Angular 18** to provide a secure, scalable, and responsive experience.

---

## 🌟 Features

- **🔐 Secure Authentication**: Multi-layered auth including Local Login, Google OAuth2, and OTP verification.
- **🤫 Anonymous Sharing**: Post your secrets without revealing your identity to the world.
- **🎨 Minimalist Design**: A clean, distraction-free UI focused on the content.
- **⚡ Modern Stack**: Built with Java 21, Spring Boot, and Angular Standalone components.
- **📱 Responsive**: Fully optimized for mobile and desktop viewing.

---

## 🚀 Quick Start

### Prerequisites

- **Java 21** or higher
- **Node.js 20+** and **NPM**
- **MongoDB** (running locally or in the cloud)
- Google Cloud Console Project (for OAuth2)

### Backend Setup

1. Navigate to the `/backend` directory.
2. Configure your environment variables:
   ```bash
   export GOOGLE_CLIENT_ID=your_id
   export GOOGLE_CLIENT_SECRET=your_secret
   ```
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend Setup

1. Navigate to the `/frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

---

## 🛠️ Architecture

The project follows a clean **Monorepo** structure:

- `backend/`: Spring Boot REST API.
- `frontend/`: Angular SPA.
- `legacy/`: Original Node.js source code (Reference).

---

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">Made with ❤️ for the Secret Keepers</p>
