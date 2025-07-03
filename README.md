# 🚀 Mini AI Tool Dashboard

A fully responsive SaaS-style dashboard built with **React**, **Vite**, **Firebase**, **Tailwind CSS**, and **shadcn/ui**. This mini app includes user authentication, role-based admin access, AI prompt management, and a real-time admin panel — designed with clean UI/UX and optimized for performance.

---

## 🧰 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Authentication**: Firebase Auth (Email/Password)
- **Database**: Firebase Firestore
- **Routing**: React Router v6
- **State**: React Context + localStorage

---

## ✨ Features Overview

### 🔐 Authentication System
- ✅ User registration and login (Email/Password)
- ✅ Firebase Auth integration
- ✅ Error handling and input validation
- ✅ Auto-redirect after login
- ✅ Persistent session using localStorage

### 👑 Admin Access Control
- ✅ Admin-only panel (`superadmin@test.com`)
- ✅ Role-based access with protected routes
- ✅ View real-time user data and prompt stats

### 🖥️ User Dashboard
- ✅ Overview cards: Total Users, Subscribed, API Calls Today
- ✅ AI Prompt submission form
- ✅ Saved prompts displayed in real-time
- ✅ Auto-refresh and persistent storage

### 🎨 UI/UX
- ✅ Fully responsive (mobile-first)
- ✅ Dark mode support
- ✅ Gradient backgrounds + glassmorphism
- ✅ Google Fonts (Inter, Poppins)
- ✅ Smooth animations + transitions

### 📊 Admin Panel
- ✅ Live statistics (total users, active users, prompt stats)
- ✅ Manual & auto data refresh
- ✅ Full user management table
- ✅ Tabs: Overview, Users, Analytics, Settings

### 💾 Data Management
- ✅ Prompt history saved per user
- ✅ Realtime sync via Firebase
- ✅ Fallback localStorage persistence

---

## 📸 Demo Video https://drive.google.com/file/d/1ttBCnmfdK5lG8k3HAbhl-IHHkL7BKdbN/view?usp=sharing

---

## 🧪 Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/yourusername/mini-ai-dashboard.git
cd mini-ai-dashboard
2. Install Dependencies
bash
Copy
Edit
npm install
3. Setup Firebase
Create a project on Firebase Console

Enable Email/Password Authentication

Create a Firestore Database

Add your Firebase config to a .env file:

env
Copy
Edit
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
4. Run the App

npm run dev

🧑‍💻 Admin Credentials

To access the Admin Panel:


Email: superadmin@test.com
Password: yourpassword
(You can set this user manually in Firestore or via Firebase Authentication)

🚀 Deployment
You can deploy the app using platforms like Vercel, Netlify, or Firebase Hosting.
Recommended: Vercel for best performance with Vite.

📁 Folder Structure
bash
Copy
Edit
📦src
 ┣ 📂components        # UI and layout components
 ┣ 📂pages             # Auth, Dashboard, Admin views
 ┣ 📂context           # Auth and Admin context
 ┣ 📂routes            # Protected and public route configs
 ┣ 📂services          # Firebase and helper services
 ┣ 📂styles            # Tailwind and global styles
 ┣ 📂utils             # Role checkers, localStorage utils
 ┗ App.tsx            # Main App component
⚙️ Upcoming Features (Optional)
 Analytics charts

 Settings customization

 File upload for prompts

 Notification system

🧠 Learnings
This project demonstrates:

Firebase Auth & Firestore integration

Role-based access control

Clean component architecture

Tailwind + shadcn UI styling

Responsive and accessible design

