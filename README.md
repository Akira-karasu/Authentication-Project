# Authentication-Project

A comprehensive authentication system built with **Node.js** and **Express.js**. This project demonstrates best practices for user authentication, authorization, secure session management, email verification, and user profile management.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation & Setup](#installation--setup)
- [Configuration](#configuration)
- [Development](#development)

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
JWT_EXPIRES_IN=expirartion_value

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
JWT_EXPIRES_IN=expiration_value
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
