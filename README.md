# Smart Bookmark Manager 🚀

A full-stack Smart Bookmark Manager built using Next.js and Supabase.

This application allows users to securely save, categorize, search, and manage bookmarks with Google Authentication support. The project is deployed on Vercel.

---

## 🔗 Live Demo

https://smart-bookmark-app-omega-five.vercel.app

---

## 🛠 Tech Stack

- Next.js (App Router)
- Supabase (Database + Authentication)
- Google OAuth
- PostgreSQL
- Vercel (Deployment)
- Tailwind CSS

---

## ✨ Features

- Google Login Authentication
- Category-based bookmark organization
- Real-time data syncing
- Search functionality
- Dark Mode toggle
- Production deployment with environment variables
- Row-Level Security (RLS) enabled

---

## ⚙️ Challenges Faced & Solutions

### 1️⃣ Supabase Authentication Redirect Issues  
**Problem:** Google login failed in production due to redirect URI mismatch.  
**Solution:** Configured correct Site URL and Redirect URL in Supabase Authentication settings.

---

### 2️⃣ Environment Variables Not Working in Production  
**Problem:** App failed after deployment because Supabase credentials were missing.  
**Solution:** Added `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel environment variables.

---

### 3️⃣ Multiple Tab Login Sync  
**Problem:** Login state was syncing across browser tabs.  
**Solution:** Understood that Supabase stores session in browser local storage, which shares authentication across tabs.

---

### 4️⃣ Dark Mode UI Issues  
**Problem:** Initial dark theme design did not look visually balanced.  
**Solution:** Refined background gradients and card styling for improved UI consistency.

---

## 🚀 How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env.local` file and add:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_key
   ```
4. Run:
   ```
   npm run dev
   ```

---

## 📌 Author

Mustaqeem Momin  
B.Tech CSE Graduate  
Full-Stack Developer

---

## 📎 Notes

This project demonstrates real-world authentication, database integration, deployment workflows, and production environment handling.
