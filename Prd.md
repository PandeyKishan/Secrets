# 📄 Product Requirement Document (PRD)

## 🎯 Project Overview
**Secrets** is a platform dedicated to anonymous self-expression. It provides a safe, digital space where users can confess, share, and offload their secrets without the fear of social repercussions.

## ⚠️ Problem Statement
In a world of hyper-connectivity and social media "perfection," people often feel pressured to hide their true thoughts, mistakes, or unconventional experiences. Traditional social networks are tied to identities, making it difficult to be truly vulnerable.

## 💡 Solution
A minimalist web application that decouples the identity of the user from the content of the message at the UI level, while maintaining a secure and verified account system at the backend level.

## 👥 Target Audience
- **The Stressed:** Individuals looking for a cathartic release by "getting it off their chest."
- **The Curious:** People who enjoy reading the raw, unfiltered experiences of others.
- **Privacy Enthusiasts:** Users who value secure, anonymous interactions.

## ✨ Core Features

### 1. Account Management
- **Secure Sign-Up:** Email-based registration with OTP (One-Time Password) to prevent bot spam.
- **Social Integration:** Google OAuth2 for a frictionless login experience.
- **JWT Auth:** Industry-standard stateless authentication.

### 2. Secret Submission
- **Simple Interface:** A single, large text field for maximum focus.
- **Persistence:** Secrets are tied to accounts but displayed anonymously.

### 3. The "Feed"
- **Global Secrets:** A collective wall of secrets from all users.
- **Anonymity First:** No usernames, timestamps, or profile links on the public feed.

## 📈 Success Metrics
- **Engagement:** Number of secrets shared per user.
- **Retention:** Monthly active users returning to read or post.
- **Security:** Zero data leaks or unauthorized access incidents.

## 🗺️ Roadmap
- **V2:** Add "Like" or "Hug" reactions to secrets.
- **V2:** Category tags (e.g., #Work, #Love, #Confession).
- **V3:** End-to-end encryption for secret storage.
