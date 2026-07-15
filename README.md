# AURELLE — MERN E-commerce

A single-seller e-commerce store built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- User authentication (register/login) with JWT
- Product browsing, search, and category filtering
- Shopping cart (persisted in localStorage)
- Mock checkout / order placement
- Order history for users
- Admin dashboard: manage products (CRUD) and orders (update status)

## Tech Stack
- **Frontend:** React (Vite), Redux Toolkit, React Router, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB Atlas

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env
# Fill in MONGO_URI and JWT_SECRET in .env
npm run dev
```

Optional — seed sample products and an admin account:
```bash
node seed.js
```
This creates an admin login: `admin@shopeasy.com` / `admin123`

### 2. Frontend
```bash
cd client
npm install
npm run dev
```

The app will run at `http://localhost:5173`, and the API at `http://localhost:5000`.

## Notes
- Checkout is a **mock flow** — no real payment gateway is integrated (appropriate for academic scope). It's structured so Stripe test mode could be added later if needed.
- Only the seeded/first user promoted to `role: 'admin'` in MongoDB (or the seeded admin account) can access `/admin` routes.
