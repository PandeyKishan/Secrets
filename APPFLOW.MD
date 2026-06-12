# 🌊 Application Flow & User Journey

Follow the path of a secret keeper through our intuitive, secure ecosystem.

---

## 🛤️ The User Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Guest
    Guest --> Register : Signup
    Register --> OTP_Verification : Email Sent
    OTP_Verification --> Dashboard : Success
    
    Guest --> Login : Sign In
    Login --> Dashboard : Success
    
    Dashboard --> SubmitSecret : Share Thought
    SubmitSecret --> Dashboard : Post Success
    
    Dashboard --> Logout : Sign Out
    Logout --> Guest
```

---

## 📱 Interactive Screen Mapping

### **Phase 1: The Gatekeeper**
| Screen | Route | Visual | Purpose |
| :--- | :--- | :--- | :--- |
| **Landing** | `/` | 🏠 | Welcome & Value Prop |
| **Auth** | `/login` | 🔑 | Entry to the platform |
| **Signup** | `/register`| 📝 | Community Onboarding |

### **Phase 2: The Inner Circle**
| Screen | Route | Visual | Purpose |
| :--- | :--- | :--- | :--- |
| **Feed** | `/secrets` | 🕵️ | The Anonymous Wall |
| **Editor** | `/submit` | ✍️ | Ghost-writing your secret |
| **Account** | `/profile` | 👤 | Managing your presence |

---

## 🔒 Security Gateways (Guards)

We use Angular **Functional Guards** to protect our ecosystem:

```mermaid
graph TD
    A[User attempts /submit] --> B{Is Authenticated?}
    B -- Yes --> C[Access Granted]
    B -- No --> D[Redirect to /login]
    
    E[Logged-in User attempts /login] --> F{Is Guest?}
    F -- No --> G[Redirect to /secrets]
    F -- Yes --> H[Access Granted]
```

---

## ⚡ Real-time Transitions
- **Auth Interceptors:** Every request automatically attaches the `Bearer Token` without developer overhead.
- **Route Resolvers:** Ensuring data is fetched *before* the component renders, preventing "layout shift."
- **Animated Routes:** Smooth slide transitions between the Feed and the Editor screens.
