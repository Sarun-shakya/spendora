# 💰 Spendora – Personal Finance Management System

**Spendora** is a full-stack personal finance management application designed to help users track their income and expenses, organize transactions, manage categories, and understand their financial habits through interactive analytics.

🌐 **Live Demo:** [https://spendoora.netlify.app](https://spendoora.netlify.app)

📂 **GitHub Repository:** [https://github.com/Sarun-shakya/spendora](https://github.com/Sarun-shakya/spendora)

---

## ✨ Features

### 🔐 Authentication & User Management

- User registration and login.
- JWT-based authentication.
- Secure HTTP-only cookie handling.
- Protected routes for authenticated users.
- User profile management.

### 💸 Transaction Management

- Add, update, and delete transactions.
- Track income and expenses.
- Organize transactions by category.
- View transaction history.
- Manage financial records efficiently.

### 📂 Category Management

- Organize transactions using categories.
- Manage custom transaction categories.
- Keep income and expenses organized.

### 📊 Financial Analytics & Dashboard

- Overview of financial activities.
- Monitor total income and expenses.
- Visualize spending patterns.
- Interactive charts and graphical reports.
- Analyze financial activities over time.

---

## 🛠️ Tech Stack

| Category              | Technologies           |
| --------------------- | ---------------------- |
| Frontend              | React.js, Vite         |
| Styling               | Tailwind CSS           |
| Backend               | Node.js, Express.js    |
| Database              | MongoDB                |
| Authentication        | JWT                    |
| Data Visualization    | Recharts               |
| Version Control       | Git, GitHub            |

---

## 🏗️ Project Architecture

Spendora follows a client-server architecture with a React frontend communicating with an Express.js REST API.

```text
Spendora/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── package.json
│
└── README.md
```
## 📸 Screenshots

### 🏠 Home Page
<img width="1917" height="1015" alt="Screenshot 2026-11-15 190657" src="https://github.com/user-attachments/assets/286bf5c5-d4bf-4415-9957-f19d7b3beaf8" />


### 📊 Dashboard
<img width="1917" height="1015" alt="image" src="https://github.com/user-attachments/assets/799d82aa-9f69-4f14-9b75-11be0c8f8554" />


---

## 🚀 Getting Started

Follow these instructions to run Spendora locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Sarun-shakya/spendora.git

cd spendora
```

### 2. Setup Backend

```bash
cd backend

npm install
```

Create a `.env` file inside the backend directory and configure your environment variables according to the backend configuration.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend development server:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend

npm install
```

Create a `.env` file inside the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

Start the frontend development server:

```bash
npm run dev
```

### 4. Access the Application

Open your browser and visit:

```text
http://localhost:5173
```

---

## 🔒 Security

- JWT-based authentication.
- Protected API routes.
- Server-side validation and authentication middleware.

---

## 🎯 Project Objectives

The main objectives of Spendora are:

- To develop a full-stack personal finance management application.
- To simplify income and expense tracking.
- To provide meaningful financial insights through data visualization.
- To implement secure user authentication.
- To gain practical experience in REST API development, database management, and full-stack application deployment.

---

## 🔮 Future Improvements

- Monthly and yearly budget planning.
- Recurring transaction management.
- Financial report generation and export.
- Advanced spending analysis.
- Improved financial insights and notifications.

---

## 👨‍💻 Author

**Sarun Shakya**

---

⭐ If you find this project interesting, consider giving the repository a star!
