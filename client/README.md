# 🏨 LuxeBook – Hotel Booking Platform

A full-stack hotel booking platform built with the **MERN Stack**, featuring secure authentication, online payments, and a powerful admin dashboard.

---

## ✨ Features

### 👤 User Features
- 🔐 Secure sign up / login via **Clerk Authentication**
- 🏩 Browse and search available hotels
- 📅 Book hotels with check-in & check-out dates
- 💳 Online payments via **Stripe** payment gateway
- 📧 Automatic email confirmation after booking
- 📋 View and manage personal bookings

### 🛠️ Admin Features
- 📊 Admin dashboard to manage all bookings
- 🏨 Add, edit, and delete hotel listings
- 👥 View and manage registered users
- 📈 Track booking status in real time

### ⚙️ Technical Features
- REST API architecture
- JWT-based role management (user / admin)
- Responsive design for mobile & desktop
- Deployed on **Vercel**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Authentication | Clerk |
| Payments | Stripe |
| Deployment | Vercel |

---

## 📦 Installation & Setup

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/) (v18 or above)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Git](https://git-scm.com/)

---

### Step 1 — Clone the Repository

```bash
git clone https://github.com/ankitkr52/luxebook.git
cd luxebook
```

---

### Step 2 — Install Dependencies

**Backend:**
```bash
cd server
npm install
```

**Frontend:**
```bash
cd client
npm install
```

---

### Step 3 — Setup Environment Variables

Create a `.env` file in the **server** folder:

```env
MONGODB_URI=your_mongodb_connection_string
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

Create a `.env` file in the **client** folder:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_API_URL=http://localhost:5000
```

---

### Step 4 — Run the Project

**Start Backend:**
```bash
cd server
npm run dev
```

**Start Frontend:**
```bash
cd client
npm run dev
```

App will run at: `http://localhost:5173`

---

## 🔑 Environment Variables Guide

| Variable | Where to Get |
|----------|-------------|
| `MONGODB_URI` | [MongoDB Atlas](https://cloud.mongodb.com/) → Connect → Driver |
| `CLERK_SECRET_KEY` | [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys |
| `VITE_CLERK_PUBLISHABLE_KEY` | [Clerk Dashboard](https://dashboard.clerk.com/) → API Keys |
| `STRIPE_SECRET_KEY` | [Stripe Dashboard](https://dashboard.stripe.com/) → Developers → API Keys |
| `VITE_STRIPE_PUBLISHABLE_KEY` | [Stripe Dashboard](https://dashboard.stripe.com/) → Developers → API Keys |

---

## 📁 Project Structure

```
luxebook/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # All pages (Home, Hotel, Booking)
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Helper functions
│   └── .env
│
├── server/                 # Node.js Backend
│   ├── controllers/        # Route controllers
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & error middleware
│   └── .env
│
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👨‍💻 Author

**Ankit Kumar**
- GitHub: [@ankitkr52](https://github.com/ankitkr52)
- LinkedIn: [Ankit Kumar](https://www.linkedin.com/in/ankit-kumar-2b3381355/)
- Email: ankit72p@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **If you found this project helpful, please give it a star!**
