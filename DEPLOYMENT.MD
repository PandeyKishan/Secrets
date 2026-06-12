# 🚀 Live Deployment Guide

This guide provides step-by-step instructions for deploying the **Secrets** platform to production.

---

## 🏗️ 1. Database: MongoDB Atlas

1.  **Create Cluster:** Sign up at [MongoDB Atlas](https://www.mongodb.com/) and create a free Shared Cluster.
2.  **Database User:** Create a user with `readWrite` access to a specific database (e.g., `user1DB`).
3.  **Network Access:** Add IP Address `0.0.0.0/0` (Allow access from anywhere) to allow your cloud host to connect.
4.  **Connection String:** Copy the `mongodb+srv://...` connection string for later.

---

## ☕ 2. Backend: Render / Railway

### Option A: Render (Recommended)
1.  **New Web Service:** Connect your GitHub repo.
2.  **Root Directory:** Set to `backend`.
3.  **Environment:** Select `Docker`. Render will automatically use the `Dockerfile` I created.
4.  **Environment Variables:** Add the following in the Render Dashboard:
    - `SPRING_DATA_MONGODB_URI`: Your MongoDB Atlas connection string.
    - `GOOGLE_CLIENT_ID`: From Google Cloud Console.
    - `GOOGLE_CLIENT_SECRET`: From Google Cloud Console.
    - `JWT_SECRET`: A long, random secure string.
    - `SPRING_MAIL_HOST`: e.g., `smtp.gmail.com`
    - `SPRING_MAIL_USERNAME`: Your email for OTP.
    - `SPRING_MAIL_PASSWORD`: Your App Password (not your main password).

---

## 🎨 3. Frontend: Vercel / Netlify

1.  **Update API URL:** Go to `frontend/src/environments/environment.prod.ts` and replace the placeholder URL with your live Backend URL (from Render/Railway).
2.  **Deploy:**
    - **Connect Repo:** Select the `frontend` directory as the root.
    - **Build Command:** `npm run build`
    - **Output Directory:** `dist/frontend/browser` (Verify this path after your first build).
3.  **Configuration:** Ensure "Redirects" are configured to handle SPA routing (redirect all `/*` to `index.html`).

---

## 🌐 4. Google OAuth2 Configuration

1.  **Google Cloud Console:** Navigate to your Project -> APIs & Services -> Credentials.
2.  **Authorized JavaScript Origins:** Add your Vercel/Netlify URL (e.g., `https://secrets-ui.vercel.app`).
3.  **Authorized Redirect URIs:** Add your Backend production callback URL:
    - `https://your-backend-url.onrender.com/login/oauth2/code/google`

---

## ✅ 5. Final Checklist
- [ ] MongoDB Atlas allows access from the host.
- [ ] Backend has all environment variables set.
- [ ] Frontend `environment.prod.ts` points to the live backend.
- [ ] Google OAuth2 credentials include the new production URLs.

---

<p align="center">Your secrets are now ready for the world! 🌍🔐</p>
