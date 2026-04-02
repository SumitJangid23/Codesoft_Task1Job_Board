Job Board Portal (MERN Stack)

Overview

This is a full-stack Job Board Portal built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The platform allows recruiters to post jobs and manage applicants, while job seekers can search for jobs and apply easily.

Features

User Authentication

- Secure signup and login using JWT
- Role-based access (Job Seeker / Recruiter)

Job Management

- Recruiters can create, update, and delete job postings
- View applicants for each job

Job Listings

- Browse available jobs
- Filter jobs by location, experience, and skills
- View detailed job descriptions

Application System

- Apply to jobs
- Resume upload functionality
- Track applied jobs

Dashboards

- Recruiter Dashboard: Manage jobs and applicants
- Job Seeker Dashboard: View applications and profile

Additional Features

- Real-time notifications using Socket.io
- Email notifications for job applications
- Forgot and Reset Password functionality
- Fully responsive UI (mobile-friendly)

---

Tech Stack

Frontend

- React.js
- Tailwind CSS
- React Router
- Axios

Backend

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Socket.io

---

Project Structure

project-root/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── api/
│
└── .gitignore

---

Environment Variables

Create a ".env" file in the backend:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_app_password

Create a ".env" file in the frontend:

VITE_API_URL=http://localhost:5000/api

---

Installation & Setup

Backend

cd backend
npm install
npm start

Frontend

cd frontend
npm install
npm run dev

---

Usage

- Open the frontend in browser (default: http://localhost:5173)
- Register as a Job Seeker or Recruiter
- Explore jobs or post jobs
- Apply and manage applications

---

Deployment

This project can be deployed using:

- Frontend: Netlify / Vercel
- Backend: Render / Railway

---

Author

Sumit Jangid

---

License

This project is for educational and internship purposes.
