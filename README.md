# 🌍 Family Travel Tracker

## 📌 Project Overview

The **Family Travel Tracker** is a full-stack web application that allows multiple family members to track the countries they have visited.

Users can:
- Add new family members
- Track visited countries
- Store data in a PostgreSQL database
- View personalized travel history

This project was built as part of Angela Yu’s Web Development Bootcamp on Udemy.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- EJS
- HTML
- CSS

---

## ✨ Features

- 👨‍👩‍👧‍👦 Multiple user support
- 🌎 Country tracking system
- 🗄 PostgreSQL database integration
- 📊 Dynamic rendering using EJS templates
- ➕ Add new visited countries
- 🔄 Switch between family members

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/AnubhavBayard/Family_Travel_Tracker
```

### 2️⃣ Navigate to the Project Folder

```bash
cd Family_Travel_Tracker
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Set Up PostgreSQL Database

- Make sure PostgreSQL is installed and running.
- Create a new database.
- Import the required tables from the given SQL file.
- Update your database credentials inside `index.js` (or your main server file).

Example configuration:

```js
const db = new pg.Client({
  user: "your_username",
  host: "localhost",
  database: "your_database_name",
  password: "your_password",
  port: 5432,
});
```

### 5️⃣ Start the Server

```bash
node index.js
```

If using nodemon:

```bash
nodemon index.js
```

### 6️⃣ Open in Browser

Visit:

```
http://localhost:3000
```

---

## 📂 Project Structure

```
├── public/
├── scratch/
├── views/
├── index.js
├── package.json
├── package-lock.json
├── queries.sql
└── README.md
```

---

## 🎯 Learning Outcomes

- Connected Node.js with PostgreSQL
- Implemented CRUD operations
- Built a dynamic full-stack application
- Managed relational database data
- Used EJS for server-side rendering

---

## 🚀 Future Improvements

- Add authentication (Login / Signup)
- Add travel statistics and charts
- Improve UI/UX
- Deploy to a cloud platform (Render / Railway / Vercel)

---

## 👩‍💻 Author

Created as part of a full-stack development learning journey.
