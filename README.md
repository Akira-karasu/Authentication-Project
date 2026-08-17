# Authentication-Project

A comprehensive authentication system built with **Node.js** and **Express.js**. This project demonstrates best practices for user authentication, authorization, secure session management, email verification, and user profile management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Usage Examples](#usage-examples)
- [Development](#development)
- [Troubleshooting](#troubleshooting)

## Features

- **User Authentication**: Secure user login and registration with validation
- **Email Verification**: Email-based account verification system
- **Password Management**: Bcrypt-based password hashing and secure password handling
- **Session Management**: Persistent session handling with JWT tokens
- **User Profiles**: Comprehensive user profile management with avatar uploads
- **Authorization Middleware**: Role-based access control and authentication verification
- **Input Validation**: Request validation for data integrity and security
- **Logging Service**: Application logging and activity tracking
- **Error Handling**: Comprehensive error handling and response management
- **File Upload**: Profile image upload with organized storage

## Tech Stack

- **Runtime**: Node.js (v14+)
- **Framework**: Express.js 5.2.1
- **Database**: MySQL 2
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Environment Variables**: Dotenv
- **Development**: Nodemon
- **Package Manager**: npm/yarn

## Project Structure

```
AuthenticationProject/
├── server.js                      # Main server entry point
├── package.json                   # Project dependencies
├── README.md                      # Documentation (this file)
├── .env                           # Environment variables (not in repo)
├── src/
│   ├── app.js                     # Express app configuration
│   ├── config/
│   │   └── database.js            # MySQL database connection setup
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic (login/register)
│   │   ├── userController.js      # User management logic
│   │   └── verificationController.js # Email verification logic
│   ├── middleware/
│   │   ├── authMiddleware.js      # Authentication token verification
│   │   └── validateAuth.js        # Input validation middleware
│   ├── routes/
│   │   ├── authRoutes.js          # Authentication endpoints
│   │   ├── userRoutes.js          # User management endpoints
│   │   └── verificationRoutes.js  # Email verification endpoints
│   └── services/
│       ├── authService.js         # Authentication business logic
│       ├── userService.js         # User management logic
│       ├── verificationService.js # Email verification logic
│       └── logsService.js         # Logging utilities
└── uploads/
    └── profiles/                  # User profile images storage
```

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- MySQL (v5.7 or higher) - running locally or accessible via network
- A code editor (VS Code, WebStorm, etc.)

### Step 1: Clone or Download the Project

```bash
cd AuthenticationProject
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- Express.js - Web framework
- MySQL2 - Database driver
- Bcrypt - Password hashing
- JWT - Token authentication
- Dotenv - Environment variable management
- Nodemon - Development hot-reload

### Step 3: Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration (MySQL)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=auth_db
DB_USER=root
DB_PASSWORD=your_mysql_password

# Authentication Secrets
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
SESSION_SECRET=your_session_secret_key_change_this_in_production

# Email Configuration (optional - for verification)
EMAIL_SERVICE=gmail
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

### Step 4: Setup Database

1. Create MySQL database:

```sql
CREATE DATABASE auth_db;
USE auth_db;
```

2. Run database initialization script (if available in `src/config/database.js`)

### Step 5: Start the Server

**For development** (with auto-reload):

```bash
npm run dev
```

**For production**:

```bash
npm start
```

The server will run on `http://localhost:3000`

## Configuration

### Database Configuration

The application uses **MySQL** as the primary database. Configuration is handled in `src/config/database.js`:

```javascript
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
```

**Key Database Features:**
- Connection pooling for better performance
- Connection testing on startup
- Automatic reconnection handling

### Middleware Setup

The application uses the following middleware:

| Middleware | File | Purpose |
|-----------|------|---------|
| **Authentication** | `authMiddleware.js` | Verifies JWT tokens and session validity |
| **Validation** | `validateAuth.js` | Validates incoming request data (email, password, etc.) |
| **Express Built-in** | `app.js` | JSON parsing, URL encoding, CORS handling |

### File Uploads

User profile images are stored in the `uploads/profiles/` directory.

**Upload Configuration:**
- Maximum file size: Configure in relevant controller
- Supported formats: JPEG, PNG, GIF, WebP
- Storage path: `uploads/profiles/[userId]/`

---

## API Endpoints

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```
**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "userId": 1
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}
```
**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "john_doe"
  }
}
```

#### 3. Logout
```http
POST /api/auth/logout
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### User Endpoints

#### 4. Get User Profile
```http
GET /api/users/profile
Authorization: Bearer <token>
```
**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "profileImage": "/uploads/profiles/1/avatar.jpg",
    "createdAt": "2026-08-17"
  }
}
```

#### 5. Update User Profile
```http
PUT /api/users/profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "username": "john_doe_updated",
  "email": "newemail@example.com"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Profile updated successfully"
}
```

#### 6. Upload Profile Picture
```http
POST /api/users/upload-avatar
Authorization: Bearer <token>
Content-Type: multipart/form-data

[Binary image file]
```
**Response (200):**
```json
{
  "success": true,
  "message": "Avatar uploaded successfully",
  "imagePath": "/uploads/profiles/1/avatar.jpg"
}
```

#### 7. Change Password
```http
PUT /api/users/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "OldPassword123!",
  "newPassword": "NewPassword456!"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

### Email Verification Endpoints

#### 8. Send Verification Email
```http
POST /api/verification/send-email
Content-Type: application/json

{
  "email": "john@example.com"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Verification email sent"
}
```

#### 9. Verify Email
```http
POST /api/verification/verify-email
Content-Type: application/json

{
  "email": "john@example.com",
  "verificationCode": "ABC123XYZ"
}
```
**Response (200):**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

---

## Usage Examples

### 1. Complete Registration Flow

```bash
# Step 1: Register a new user
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_smith",
    "email": "jane@example.com",
    "password": "SecurePass123!"
  }'

# Step 2: Send verification email
curl -X POST http://localhost:3000/api/verification/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com"
  }'

# Step 3: Verify email with code received
curl -X POST http://localhost:3000/api/verification/verify-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "verificationCode": "123456"
  }'

# Step 4: Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "SecurePass123!"
  }'
```

### 2. Managing User Profile

```bash
# Get profile (requires token from login)
TOKEN="your_jwt_token_here"
curl -X GET http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer $TOKEN"

# Update profile
curl -X PUT http://localhost:3000/api/users/profile \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jane_smith_updated"
  }'

# Upload avatar
curl -X POST http://localhost:3000/api/users/upload-avatar \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/avatar.jpg"
```

### 3. Using with JavaScript/Fetch API

```javascript
// Registration
async function register(username, email, password) {
  const response = await fetch('http://localhost:3000/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password })
  });
  return response.json();
}

// Login
async function login(email, password) {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data;
}

// Protected request with token
async function getUserProfile() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/api/users/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
}
```

---

## Development

### Running in Development Mode

```bash
npm run dev
```

This uses **Nodemon** for automatic server restart on file changes.

### Project Conventions

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and database operations
- **Middleware**: Process requests before they reach controllers
- **Routes**: Define API endpoints and map them to controllers
- **Config**: Database and application setup

### Environment Variables

Never commit `.env` file to version control. Create `.env.example`:

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=auth_db
DB_USER=root
DB_PASSWORD=
JWT_SECRET=your_secret_here
SESSION_SECRET=your_session_secret_here
```

---

## Troubleshooting

### Issue: "Cannot find module 'express'"

**Solution:**
```bash
npm install
```

### Issue: "ECONNREFUSED - Cannot connect to database"

**Check:**
- MySQL server is running
- DB_HOST, DB_PORT, DB_USER, DB_PASSWORD are correct in `.env`
- Database `auth_db` exists

```bash
# Test MySQL connection
mysql -h localhost -u root -p -e "USE auth_db; SHOW TABLES;"
```

### Issue: "JWT token expired"

- Tokens expire based on server configuration
- Client should store token and refresh when needed
- Re-login to get a new token

### Issue: "File upload failing"

**Check:**
- `uploads/profiles/` directory exists and is writable
- File size doesn't exceed limit
- File format is supported (JPEG, PNG, etc.)

```bash
# Ensure directory exists
mkdir -p uploads/profiles
chmod 755 uploads/profiles
```

### Issue: "CORS errors in frontend"

**Solution:** Update `src/app.js` CORS configuration:

```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

---

## Security Considerations

- **Passwords**: Always hashed with Bcrypt before storage
- **JWT Tokens**: Keep SECRET keys strong and never expose them
- **Environment Variables**: Never commit `.env` to version control
- **Input Validation**: All user inputs validated before database operations
- **HTTPS**: Use HTTPS in production
- **Rate Limiting**: Implement rate limiting on authentication endpoints
- **CORS**: Configure CORS policy appropriately for your frontend

---

**Last Updated**: 2026-08-17  
**Version**: 1.0.0  
**License**: ISC  
**Author**: Your Name

## Support & Contributing

For issues, questions, or contributions, please reach out or create an issue in the repository.

---

*Built with ❤️ using Node.js and Express.js*
