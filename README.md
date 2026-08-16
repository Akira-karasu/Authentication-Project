# Authentication-Project

This project is a comprehensive authentication system built with **Node.js** and **Express.js**. It demonstrates best practices for user authentication, authorization, and secure session management.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)

## Features

- **User Authentication**: Secure user login and registration
- **Password Management**: Bcrypt-based password hashing
- **Session Management**: Persistent session handling
- **User Profiles**: User profile management with avatar uploads
- **Middleware Protection**: Authentication and authorization middleware
- **Input Validation**: Request validation for data integrity
- **Logging Service**: Application logging and tracking
- **Error Handling**: Comprehensive error handling

## Project Structure

```
AuthenticationProject/
├── server.js                 # Main server entry point
├── package.json              # Project dependencies
├── README.md                 # Documentation (this file)
├── src/
│   ├── app.js                # Express app configuration
│   ├── config/
│   │   └── database.js       # Database connection setup
│   ├── controllers/
│   │   ├── authController.js # Authentication logic
│   │   └── userController.js # User management logic
│   ├── middleware/
│   │   ├── authMiddleware.js # Authentication verification
│   │   └── validateAuth.js   # Input validation
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   └── userRoutes.js     # User endpoints
│   └── services/
│       ├── authService.js    # Authentication business logic
│       ├── userService.js    # User management logic
│       └── logsService.js    # Logging utilities
└── uploads/
    └── profiles/             # User profile images storage
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Database (MongoDB or PostgreSQL)

### Step 1: Clone or Download

```bash
cd AuthenticationProject
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Configuration

Create a `.env` file in the root directory:

```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=auth_db
DB_USER=your_username
DB_PASSWORD=your_password
JWT_SECRET=your_jwt_secret_key
SESSION_SECRET=your_session_secret_key
```

### Step 4: Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

## Configuration

### Database Configuration

Edit `src/config/database.js` to set up your database connection:

```javascript
const db = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};
```

### Middleware Setup

The application uses the following middleware:

- **authMiddleware.js**: Verifies JWT tokens and session validity
- **validateAuth.js**: Validates incoming request data

### File Uploads

User profile images are stored in the `uploads/profiles/` directory. Configure upload limits in the main app configuration.

---

**Last Updated**: 2026-08-16  
**Version**: 1.0.0
