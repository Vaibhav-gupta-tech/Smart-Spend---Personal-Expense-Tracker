# Smart-Spend---Personal-Expense-Tracker
```md
# Expense Management System  
FastAPI Backend + Next.js Frontend + PostgreSQL + JWT Authentication

This project is a full-stack Expense Management System built using **FastAPI**, **PostgreSQL**, **SQLAlchemy**, **Alembic**, **JWT Authentication**, **Next.js**, and **Docker**.

---

## 🚀 Features

### 🔐 Authentication
- User Registration  
- User Login  
- JWT-Based Authentication  
- Protected Routes (requires Bearer Token)

### 💸 Expense Management
- Add New Expense  
- Get All Expenses (User-wise)  
- Update Expense  
- Delete Expense  

### 🧰 Tech Stack
- **Backend:** FastAPI, SQLAlchemy, Alembic  
- **Database:** PostgreSQL  
- **Frontend:** Next.js (TypeScript)  
- **Auth:** JWT (JSON Web Tokens)  
- **Containerization:** Docker  
- **ORM:** SQLAlchemy 2.0  
- **Migrations:** Alembic  

---

## 📂 Project Structure

```

/app
├── app
│    ├── core
│    ├── models
│    ├── routers
│    ├── schemas
│    ├── main.py
│    └── database.py
├── alembic
├── alembic.ini
├── requirements.txt
/frontend
├── components
├── pages
├── utils
├── package.json
└── next.config.js

````

---

## ⚙️ Backend Setup (FastAPI)

### 1️⃣ Install dependencies
```bash
pip install -r requirements.txt
````

### 2️⃣ Run Alembic Migrations

```bash
alembic revision --autogenerate -m "init"
alembic upgrade head
```

### 3️⃣ Start Server

```bash
uvicorn app.main:app --reload
```

Backend will run on:

```
http://localhost:8000
```

---

## 🐳 Run With Docker (Recommended)

```bash
docker-compose up --build
```

---

## 🧪 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint       | Description           |
| ------ | -------------- | --------------------- |
| POST   | /auth/register | Register new user     |
| POST   | /auth/login    | Login + get JWT token |

### 💸 Expense Routes

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | /expenses/add         | Create new expense      |
| GET    | /expenses/my-expenses | Get all expenses        |
| PUT    | /expenses/update/{id} | Update specific expense |
| DELETE | /expenses/delete/{id} | Delete expense          |

⚠️ All expense routes require Bearer Token.

---

## 🔑 Testing Auth in Postman

1. Register user → `/auth/register`
2. Login → `/auth/login` → copy token
3. For protected routes:

   * Go to **Authorization → Bearer Token**
   * Paste token

---

## 🖥️ Frontend Setup (Next.js)

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start Development Server

```bash
npm run dev
```

### 3️⃣ Environment Variables (`.env.local`)

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 📝 TODO (Upcoming)

* Add pagination in expenses
* Add analytics dashboard
* Add forgot password
* Add charts (Pie/Bar) for expenses

---

## 🤝 Contributing

Feel free to raise issues or create pull requests.
```

People often struggle to monitor their spending habits and maintain budgets.  This app helps users record daily expenses, categorize them, set monthly budgets, and visualize spending trends via charts.  The goal is to give users better financial awareness, all within a simple, clean web app.
