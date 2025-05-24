# 📦 cloud-native-microservice-2

A simple **Node.js + Express** microservice for managing student data, built with **MongoDB** using **Mongoose**. This project demonstrates basic CRUD operations and RESTful API design, suitable for learning DevOps practices like containerization, CI/CD, and cloud deployment.

---

## 🚀 Features

- Register new students
- Login with student credentials
- Search student by ID
- Update student profile
- Delete student record
- MongoDB integration using Mongoose

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**

---


## 📦 Installation

```bash
git clone https://github.com/your-username/cloud-native-microservice-2.git
cd cloud-native-microservice-2
npm install
```

---


## 🗑️ MONGO
**In line #11, replase the connection string with yours**
---

## ▶️ Running
```bash
node app.js
```
---
## 📬 Testing API Endpoints

```http
POST /register
- Description: Register a new student
- Body:
{
    "studentId": "123",
    "name": "Chanheng Menh",
    "email": "chanhengmenh@gmail.com",
    "password": "s.123",
    "age": 30,
    "major": "Digital Infrastructure"
}

POST /login
- Description: Login with student ID and password
- Body:
{
    "studentId": "123",
    "password": "s.123"
}

GET /search/:123
- Description: Search for a student by their ID

PUT /update/:123
- Description: Update student profile
- Body:
{
    "name": "Chanheng Menh",
    "email": "chanhengmenh@gmail.com",
    "password": "123",
    "age": 31,
    "major": "Digital Infrastructure"
}

DELETE /delete/:studentId
- Description: Delete a student by their ID
```

