# Visitor Pass Management System

A full-stack Visitor Pass Management System built using the MERN stack to manage visitors, workers, pass issuance, QR verification, entry/exit tracking, renewal history, role-based access control, and master data management within an industrial campus or organization.

---

## 📋 Project Overview

The Visitor Pass Management System digitizes visitor and worker entry processes by replacing manual registers with a secure QR-based pass management solution.

The system allows organizations to:

* Register Visitors and Workers
* Upload Photographs and ID Proofs
* Generate QR-based Passes
* Verify Passes through QR Scanning
* Track Entry and Exit Logs
* Maintain Renewal History
* Manage Master Data
* Control Access using User Roles
* Generate Reports and Dashboard Statistics

---

## 🚀 Live Demo

### Frontend

https://visitor-pass-management-system-pi.vercel.app

### Backend API

https://visitor-pass-management-system-ncgs.onrender.com

---

## 🔑 Demo Credentials

### Admin

Email: admin@company.com

Password: admin123

### Receptionist

Email: reception@company.com

Password: reception123

### Security

Email: security@company.com

Password: security123

### Reports

Email: reports@company.com

Password: reports123

---

## ✨ Features

### 🔐 Authentication & Authorization

* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* Role-Based Access Control (RBAC)

Supported Roles:

* Admin
* Receptionist
* Security
* Reports

---

### 👤 Visitor Management

* Create Visitor
* View Visitors
* Update Visitor Details
* Delete Visitors
* Search Visitors
* Upload Visitor Photograph
* Upload Visitor ID Proof

Captured Information:

* Name
* Address
* Mobile Number
* ID Proof Type
* ID Proof Number
* Visitor Photograph
* ID Proof Photograph

---

### 👷 Worker Management

* Create Worker
* View Workers
* Update Worker Details
* Delete Workers
* Search Workers
* Upload Worker Photograph
* Upload Worker ID Proof

Captured Information:

* Name
* Address
* Mobile Number
* Department
* Designation
* ID Proof Type
* ID Proof Number
* Worker Photograph
* ID Proof Photograph

---

### 🎫 Pass Management

* Visitor Pass Generation
* Worker Pass Generation
* QR Code Generation
* QR Code Verification
* Pass Status Tracking
* Pass Renewal
* Renewal History
* Pass Download / Print Support
* QR Code Download

Pass Status:

* Active
* Expired
* Blocked

---

### 📱 QR Verification System

* Unique QR generated for every pass
* QR Scanner Integration
* Real-time Pass Verification
* Security Gate Verification

Verified Information:

* Pass Holder Details
* Pass Type
* Expiry Status
* Pass Validity

---

### 🚪 Entry & Exit Tracking

* QR-based Entry Logging
* QR-based Exit Logging
* Inside / Outside Tracking
* Entry History
* Exit History

---

### 🏢 Master Data Management

#### Gates

* Create
* Read
* Update
* Delete
* Search

#### Areas

* Create
* Read
* Update
* Delete
* Search

#### Buildings

* Create
* Read
* Update
* Delete
* Search

#### Departments

* Create
* Read
* Update
* Delete
* Search

---

### 📊 Dashboard & Reports

Dashboard Statistics:

* Total Visitors
* Total Workers
* Total Passes
* Total Logs
* Recent Visitors
* Recent Activity Logs

Reports:

* Visitor Reports
* Worker Reports
* Pass Reports
* Entry / Exit Reports

---

### 🔍 Search Functionality

Search by:

* Name
* Mobile Number
* ID Proof Number
* Department
* Designation
* Pass Information

---

### 🛡 Security Features

* Helmet Security Middleware
* Rate Limiting
* JWT Authentication
* Request Validation
* Protected APIs
* Role-Based Authorization

---

### 🌐 Deployment & LAN Support

#### Cloud Deployment

Frontend:

* Vercel

Backend:

* Render

#### Local Network Deployment

* Accessible from multiple devices on the same network when internet connectivity is available.
  
---

## 📸 Screenshots

### Login Page
<img width="1361" height="607" alt="image" src="https://github.com/user-attachments/assets/aba25f38-deb3-4065-94a1-2e20408e2cbc" />

### Dashboard
<img width="1349" height="607" alt="image" src="https://github.com/user-attachments/assets/c64cbc30-7f5c-4607-b64e-c7c1af3e06d6" />

### Visitors Module
<img width="1348" height="606" alt="image" src="https://github.com/user-attachments/assets/acdfc4d3-d2a4-4a24-857d-55f687974934" />

### Workers Module
<img width="1350" height="608" alt="image" src="https://github.com/user-attachments/assets/f0cba205-abc4-4e79-8ff7-931e7cd90f28" />

### Pass Management
<img width="1347" height="606" alt="image" src="https://github.com/user-attachments/assets/452c9d77-32a7-4fa0-bdc8-918120d9af07" />

### QR Verification
<img width="1351" height="608" alt="image" src="https://github.com/user-attachments/assets/eea49cf6-3428-44cb-8c5a-f66b0f08c02c" />

### Reports Module
<img width="1349" height="607" alt="image" src="https://github.com/user-attachments/assets/99ca6e4c-a735-40b3-9a0a-f62ce2f014fa" />

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router DOM
* html5-qrcode

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs
* Multer
* QRCode
* Express Validator

### Deployment

* Vercel
* Render

---

## 📂 Project Structure

```text
visitor-pass-management-system/
│
├── frontend/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── uploads/
│
├── docs/
│   └── VisitorPassManagement.postman_collection.json
│
└── README.md
```

---

## ⚙ Environment Variables

### Backend (.env)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_BASE_URL=http://localhost:5000
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/abhi-nav-25/visitor-pass-management-system.git
```

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 📖 API Documentation

Postman Collection:

```text
docs/VisitorPassManagement.postman_collection.json
```

Import the collection into Postman and configure:

```text
BASE_URL
TOKEN
```

before testing protected endpoints.

---

## 🎯 Learning Outcomes

This project helped in understanding:

* MERN Stack Development
* REST API Design
* JWT Authentication
* RBAC Implementation
* MongoDB & Mongoose
* File Upload Handling using Multer
* QR Code Generation & Verification
* LAN Deployment
* Vercel Deployment
* Render Deployment
* Secure Backend Development

---

## 👨‍💻 Author

**Abhinav Sharma**

B.Tech Computer Science Engineering

VIT Chennai

GitHub: [abhi-nav-25](https://github.com/abhi-nav-25)
