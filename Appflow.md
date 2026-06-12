# 🌊 Application Flow & User Journey

This document maps the user journey through the **Secrets** application.

## 🛣️ User Journey

### 1. Discovery (Guest)
- **Land on Home Page:** User sees the "Secrets" branding and the core value proposition.
- **View Public Secrets:** Users can browse secrets without logging in to see the community's vibe.

### 2. Onboarding (New User)
- **Register:** User enters email and password.
- **OTP Verification:** User receives a code via email and enters it to verify their identity.
- **Redirect:** Automatically redirected to the Dashboard/Secrets page upon success.

### 3. Authentication (Returning User)
- **Login:** Enter credentials or use **Google One-Tap/Sign-In**.
- **JWT Issuance:** App receives a token and stores it in LocalStorage.

### 4. Contribution (Member)
- **Navigate to Submit:** User goes to the `/submit` page.
- **Write Secret:** User types their secret into the text area.
- **Submit:** Data is sent to the backend, validated, and saved to the user's document.
- **View:** User is redirected to see their new secret among others.

## 🖥️ Screen Map

| Route | Component | Access | Description |
| :--- | :--- | :--- | :--- |
| `/` | `HomeComponent` | Public | The landing page. |
| `/login` | `LoginComponent` | Guest Only | Local and Social login options. |
| `/register` | `RegisterComponent` | Guest Only | Sign up form with OTP steps. |
| `/secrets` | `SecretsComponent` | Private | The main feed of anonymous secrets. |
| `/submit` | `SubmitComponent` | Private | Form to share a new secret. |
| `/profile` | `ProfileComponent` | Private | User account details and personal secrets. |

## 🛡️ Guard Logic

- **Auth Guard:** Prevents unauthenticated users from accessing `/secrets`, `/submit`, and `/profile`.
- **Guest Guard:** Prevents logged-in users from going back to `/login` or `/register`.
