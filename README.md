# 🍽️ OnoCafiterialApp

A full-stack cafeteria ordering web application designed to simplify and digitize food ordering within an academic environment. Built with **React**, **TypeScript**, **Node.js**, **Express**, and **MongoDB**, it includes both an admin panel and a student-facing ordering system.

---

## ✨ Features

### 👨‍🎓 For Students
- Browse and filter available dishes by category
- View dish details, images, prices, and estimated prep time
- Add items to a cart and place an order
- View order history and current status in real time

### 🛠️ For Admins
- Manage categories and menu items
- Track orders by status (Pending, Preparing, Ready, etc.)
- Update statuses and monitor order performance
- View dashboard analytics (most popular items, revenue, alerts)

---

## 🧱 Folder Structure

```
client/
│
├── src/
│   ├── config/                # App-wide config (e.g. axios setup)
│   ├── features/              # Main application modules
│   │   ├── Admin/
│   │   │   ├── components/    # Reusable UI logic for admin features
│   │   │   │   ├── categories/
│   │   │   │   ├── items/
│   │   │   │   ├── order/
│   │   │   │   ├── dashboard/
│   │   │   ├── pages/         # Admin views (dashboard, item mgmt, etc.)
│   │   │   └── services/      # API interaction layer
│   │   ├── Auth/              # Login, register, auth hooks/store
│   │   ├── Header/            # Navigation bar
│   │   ├── Order/             # Student order process logic
│   │   └── Student/           # Student-facing components
│   ├── lib/                   # Global utils and reusable logic
│   ├── shared/                # Shared UI components and types
│   │   ├── components/        # e.g. BaseButton, BaseInput
│   │   └── types/             # TypeScript interfaces for domain models
│
├── App.tsx                   # Root component with routing
├── main.tsx                  # App bootstrap
```

> Server code (Node.js + Express) lives in the `server/` directory and connects to MongoDB via Mongoose.

---

## ⚙️ Tech Stack

### 🔧 Backend
- Node.js + Express
- MongoDB + Mongoose
- RESTful API
- UUID for custom IDs
- Hosted via Render / Local development

### 💻 Frontend
- React + Vite + TypeScript
- Zustand for global state
- React Router v6
- Axios for API calls
- Material UI v5 (MUI)
- Custom base components for clean design

---

## 🧪 Local Development

### 📦 Prerequisites
- Node.js (18+)
- MongoDB local or Atlas
- Yarn or npm

### 🚀 Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/OnoCafiterialApp.git
cd OnoCafiterialApp

# Install client dependencies
cd client
npm install

# Start the client
npm run dev

# In another terminal, start the server
cd ../server
npm install
npm run dev
```

> Create a `.env` in `server/` with your MongoDB connection string:
```
MONGO_URI=mongodb+srv://your-mongo-connection
PORT=5000
```

---

## 🧠 Architectural Highlights

- 🔄 Client-side state persisted locally for prototype phase
- 📁 All API interaction abstracted into service files
- 🧩 Shared UI is abstracted in a `shared/` directory with consistent MUI patterns
- 🎨 Uses custom wrapper components (`BaseInput`, `BaseButton`, etc.) for reusability
- 🧠 Type safety using shared DTOs/interfaces

---

## 🛣 Roadmap Ideas

- Add real-time order updates (e.g. using WebSocket or polling)
- Role-based route protection
- PDF invoice/receipt generation
- Admin notifications system

---

## 📄 License

MIT — feel free to use, modify, and share.

---

## 🙌 Credits

Built by Ofek Vaknin & team as a hands-on academic project with full-stack architecture.
