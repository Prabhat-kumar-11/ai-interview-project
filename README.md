# AI Interview Preparation Platform

An AI-powered interview preparation platform built using the MERN stack that helps users upload resumes, analyze job compatibility, and generate AI-based interview preparation reports.

---

## 🚀 Features

- User Authentication (Login/Register)
- Upload Resume PDF
- AI-Based Resume Analysis
- Match Score Generation
- Technical Interview Questions
- Behavioral Interview Questions
- Skill Gap Analysis
- Personalized Preparation Plan
- AI Generated Resume PDF
- Protected Routes
- Responsive UI

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- SCSS
- Vite

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- PDF Parse
- Google Gemini AI
- Puppeteer
- Zod

---

# 📁 Folder Structure

```bash
interview-ai-yt-main/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   └── services/
│   │
│   ├── server.js
│   └── package.json
│
├── Frontend/
│   ├── src/
│   │   ├── features/
│   │   ├── style/
│   │   ├── App.jsx
│   │   └── app.routes.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
cd interview-ai-yt-main
```

---

# 🔧 Backend Setup

## Go to Backend Folder

```bash
cd Backend
```

## Install Dependencies

```bash
npm install
```

## Create `.env` File

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GOOGLE_GENAI_API_KEY=your_google_gemini_api_key
```

## Run Backend

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:5000
```

---

# 💻 Frontend Setup

## Go to Frontend Folder

```bash
cd Frontend
```

## Install Dependencies

```bash
npm install
```

## Run Frontend

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Server Port |
| MONGODB_URI | MongoDB Connection String |
| JWT_SECRET | JWT Secret Key |
| GOOGLE_GENAI_API_KEY | Google Gemini API Key |

---

# 📌 API Routes

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | Register User |
| POST | `/auth/login` | Login User |
| POST | `/auth/logout` | Logout User |

---

## Interview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/interview/generate` | Generate Interview Report |
| GET | `/interview/:id` | Get Single Report |
| GET | `/interview` | Get All Reports |
| GET | `/interview/resume/:id` | Generate Resume PDF |

---

# 🤖 AI Features

Using Google Gemini AI, the platform generates:

- Resume Match Score
- Technical Questions
- Behavioral Questions
- Skill Gap Analysis
- Preparation Roadmap
- AI Optimized Resume

---

# 📦 Main Packages

## Backend Packages

```json
{
  "@google/genai": "^1.42.0",
  "bcryptjs": "^3.0.3",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.6",
  "dotenv": "^17.3.1",
  "express": "^5.2.1",
  "jsonwebtoken": "^9.0.3",
  "mongoose": "^9.2.1",
  "multer": "^2.0.2",
  "pdf-parse": "^2.4.5",
  "puppeteer": "^24.37.5",
  "zod": "^3.25.76"
}
```

---

# 🧪 Future Improvements

- AI Voice Interview
- ATS Resume Score
- Interview Analytics Dashboard
- Dark Mode
- Email Report Sharing
- Mock Interview Sessions



