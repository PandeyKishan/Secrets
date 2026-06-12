# 📊 Database Schema

Secrets uses **MongoDB**, a NoSQL document database, which allows for a flexible and performant schema design.

## 📁 Collections

### 1. `users`
Stores user profile information, authentication credentials, and their submitted secrets.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier for the user. |
| `username` | String | User's email address (used for local login). |
| `password` | String | BCrypt hashed password. |
| `googleId` | String | Optional ID provided by Google OAuth. |
| `secret` | Array<String> | An array of secrets submitted by this user. |

### 2. `otp_tokens`
Temporary storage for One-Time Passwords used during registration/verification.

| Field | Type | Description |
| :--- | :--- | :--- |
| `_id` | ObjectId | Unique identifier. |
| `email` | String | The email address receiving the OTP. |
| `otp` | String | The generated 6-digit (or similar) code. |
| `expiryDate` | ISODate | Timestamp when the token becomes invalid. |

## 🔗 Relationships

- **User-to-Secrets:** This is a **One-to-Many** relationship. In this implementation, we use **Embedding**.
  - *Why?* Secrets are generally short strings and directly tied to the user's "voice". Embedding them simplifies queries and ensures all user data is retrieved in a single read operation.
- **User-to-OTP:** This is a **One-to-One** (transient) relationship. The `email` field acts as the link between the registration intent and the token.

## 🛠️ Data Integrity & Security

- **Password Hashing:** All passwords are encrypted using `BCrypt`.
- **Statelessness:** No session data is stored in the database; authentication is handled via JWTs issued upon valid login/registration.
- **Indexing:** The `username` field in the `users` collection is indexed for fast lookup during login.
