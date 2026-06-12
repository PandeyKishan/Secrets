# 🎨 UI/UX Design Specification

The design of **Secrets** focuses on minimalism, anonymity, and a focused user experience.

## 🌈 Visual Language

- **Background:** Primary background is `#eee` (light gray) to keep the focus on the content cards.
- **Typography:** Uses standard sans-serif fonts (Helvetica/Arial) provided by Bootstrap.
- **Spacing:** Generous use of white space and centered "Jumbotron" layouts to emphasize individual secrets.

## 🧱 UI Components

### 1. Home Screen
- **Hero Section:** Large "Key" icon from FontAwesome.
- **CTA:** High-contrast buttons (Register, Login, View Secrets).
- **Vibe:** Welcoming and mysterious.

### 2. Secret Cards
- **Structure:** Simple white cards with centered text.
- **Typography:** Italicized or bold text for the secret content.
- **Anonymity:** No user avatars or names are displayed alongside secrets.

### 3. Forms (Login/Register)
- **Layout:** Centered cards.
- **Input Fields:** Clean Bootstrap form-controls.
- **Social Buttons:** Iconic "Sign in with Google" buttons using `bootstrap-social`.

### 4. Dashboard (Submission)
- **Input:** Large text area for writing secrets.
- **Feedback:** Loading spinners during submission to provide interactive feedback.

## 📱 Responsiveness

- **Grid System:** Uses the Bootstrap 12-column grid.
- **Breakpoints:**
  - **Mobile:** Single column, full-width cards.
  - **Desktop:** Centered narrow containers to maintain readability.

## 🌑 Interactions

- **Hover States:** Subtle darkening of buttons.
- **Transitions:** Smooth navigation between routes using Angular's router.
- **Modals/Toasts:** Used for error messages and OTP verification prompts.
