# 📚 Library Management API

This is a **Library Management API** built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.  
The API supports borrowing, returning, and tracking books with proper validation and status handling.

---

## ⚡ Features
- 📖 Create, read, update, and delete books
- 📚 Borrow books with quantity checks
- 🔄 Automatic availability status update
- 🧮 Aggregated summary of borrowed books
- 🔐 MongoDB Atlas for data storage
- 🚀 Hosted on **Vercel** as a Serverless function

---

## 🧑‍💻 Tech Stack
- **Node.js** & **Express**
- **TypeScript**
- **Mongoose** for MongoDB
- **Vercel** for deployment
- **MongoDB Atlas** for database hosting

---

## 🛠️ Prerequisites
Make sure you have:
- Node.js >= 18
- MongoDB Atlas account
- GitHub account
- Vercel account

---

---
## Live Api Link
### [link](https://libarary-db.vercel.app)

## Video Explain Link
### [drive](https://drive.google.com/file/d/1kQX3KicmWOAyCD3FSpbvnXHc6vAt2Txv/view)

---

## 🚀 Getting Started (Local Development)

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Hayder987/assignment-3-mongoose.git
cd assignment-3-mongoose

npm install

create .env file and add
DB_USER=your mongodb user name
DB_PASS=your mongodb password

npm run dev

## test api

### POST Book http://localhost:5000/api/books
- body
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "copies": 5
}


### POST Borrow 
http://localhost:5000//api/borrow

- body

  {
  "book": "<book-id>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

### get all Books 
http://localhost:5000/api/books
  
### get allbooks with filter sort and limit
http://localhost:5000/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5

### get all Borrowed Books Summary 
http://localhost:5000/api/borrow




