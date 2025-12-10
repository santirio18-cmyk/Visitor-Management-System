# Vendor Management System

A comprehensive web application for managing vendor visit requests with a two-level approval system. Built with React frontend and Node.js/Express backend.

## Features

- **Public Visitor Form**: Visitors can submit visit requests without registration
- **Two-Level Approval System**: 
  - First-level approvers can approve, reject, or pass requests to second level
  - Second-level approvers can approve or reject requests
- **Email Notifications**: Automated email notifications for request status changes
- **Role-Based Access Control**: Different dashboards for visitors, first-level approvers, and second-level approvers
- **Request Management**: View, filter, and manage visit requests with detailed information

## Tech Stack

### Frontend
- React
- React Router
- Axios
- React Toastify
- date-fns
- CSS3

### Backend
- Node.js
- Express
- SQLite
- JWT Authentication
- Nodemailer
- express-validator
- bcryptjs

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Vendor Management System"
```

2. Install dependencies:
```bash
npm run install-all
```

3. Set up environment variables:

Create a `.env` file in the `server` directory:
```env
PORT=5001
CLIENT_PORT=3001
JWT_SECRET=your-secret-key-change-in-production
MANAGER_EMAIL=manager@warehouse.com

# Email Configuration (Gmail)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Or Custom SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-password
```

4. Initialize the database:
The database will be automatically created when you start the server.

5. Run the application:
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3001
- Backend API: http://localhost:5001

## Default Users

### First Level Approver
- Email: `manager@warehouse.com`
- Password: `manager123`
- Role: Warehouse Manager

### Second Level Approver
- Email: `varadarajan.krishnamachari@tvs.in`
- Password: `V@ra2024#TVS!Approver2`
- Role: Second Level Approver

## Project Structure

```
Vendor Management System/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   └── config.js      # API configuration
│   └── package.json
├── server/                 # Node.js backend
│   ├── routes/            # API routes
│   ├── middleware/        # Authentication middleware
│   ├── database/          # Database setup
│   ├── services/          # Email service
│   └── package.json
└── package.json           # Root package.json
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Requests
- `POST /api/requests/public` - Submit public visit request
- `GET /api/requests` - Get all requests (role-based)
- `GET /api/requests/:id` - Get request details
- `PATCH /api/requests/:id/status` - Update request status (First level)
- `PATCH /api/requests/:id/second-level-status` - Update request status (Second level)
- `DELETE /api/requests/:id` - Delete request

## Email Configuration

See `server/EMAIL_SETUP.md` and `server/OUTLOOK_SETUP.md` for detailed email configuration instructions.

## License

ISC

## Author

Vendor Management System
