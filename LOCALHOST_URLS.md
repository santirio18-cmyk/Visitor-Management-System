# 🖥️ Localhost URLs

## Running the App Locally

### Frontend (React App)
**URL:** http://localhost:3001

### Backend (API Server)
**URL:** http://localhost:5001

---

## How to Start

### Step 1: Install Dependencies (First Time Only)
```bash
npm run install-all
```

### Step 2: Start Both Frontend and Backend
```bash
npm run dev
```

This will start:
- ✅ Frontend at: **http://localhost:3001**
- ✅ Backend at: **http://localhost:5001**

---

## Or Start Separately

### Start Backend Only:
```bash
npm run server
```
Backend runs at: **http://localhost:5001**

### Start Frontend Only:
```bash
npm run client
```
Frontend runs at: **http://localhost:3001**

---

## Quick Reference

| Service | URL | Port |
|---------|-----|------|
| **Frontend** | http://localhost:3001 | 3001 |
| **Backend API** | http://localhost:5001 | 5001 |

---

## Access Points

- **Public Form (Visitor Entry)**: http://localhost:3001/
- **Login Page**: http://localhost:3001/login
- **Register Page**: http://localhost:3001/register
- **Dashboard**: http://localhost:3001/dashboard
- **API Health Check**: http://localhost:5001/api/health

---

## Notes

- Make sure both servers are running to use the full app
- Frontend connects to backend automatically
- Backend must be running for API calls to work

---

That's it! 🎉

