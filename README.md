# Auth System API

## Overview
The **Auth System API** is a simple authentication system built using **Node.js**, **Express**, and **MongoDB**. It allows users to register, log in, and log out securely. Input validation is implemented using **Joi** to ensure proper email, password, and username formats. The app is deployed and hosted on **Render** for easy access.

- **Base URL**: [https://auth-system-api-zru4.onrender.com](https://auth-system-api-zru4.onrender.com)

## Features
- **Register**: Users can register by providing their `username`, `email`, and `password`. The email is validated for proper format, and the password must be at least 8 characters long.
- **Login**: Users can log in using their email and password. Passwords are hashed for security.
- **Logout**: A simple endpoint to log the user out.

## Technologies Used
- **Node.js** - JavaScript runtime for the server.
- **Express** - Web framework for building the API.
- **MongoDB** - NoSQL database to store user data.
- **Joi** - Validation library to validate user input for email, password, and username.

## Endpoints

### 1. **POST /api/register**
Registers a new user.

**Request Body**:
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
- **201 Created**: User registered successfully.
  ```json
  {
    "message": "User: user@example.com >> registered successfully",
    "token": "<JWT_TOKEN>"
  }
  ```
- **400 Bad Request**: Invalid input or user already exists.

---

### 2. **POST /api/login**
Logs in an existing user.

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response**:
- **200 OK**: Successfully logged in with a JWT token.
  ```json
  {
    "message": "User : user@example.com >> logged in successfully",
    "token": "<JWT_TOKEN>"
  }
  ```
- **400 Bad Request**: Invalid credentials.

---

### 3. **POST /api/logout**
Logs out the current user (simply returns a success message).

**Response**:
- **200 OK**: User logged out successfully.
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

---

## Validation

The following fields are validated using **Joi**:

- **Email**: Must be a valid email format.
- **Password**: Must be at least 8 characters long.
- **Username**: Must be between 3 and 30 characters.

If the input doesn't meet these criteria, an appropriate error message is returned.

## Deployment

The API is hosted on **Render**. You can access the app through the following base URL:

- **Base URL**: [https://auth-system-api-zru4.onrender.com](https://auth-system-api-zru4.onrender.com)

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   cd auth-system-api
   npm install
   ```

3. Set up environment variables for **JWT_SECRET** and **MONGODB_URI** (or use a local database for testing).

4. Run the server:
   ```bash
   npm start
   ```

5. Visit the API endpoints at [http://localhost:5000](http://localhost:5000).

---

## Contributing

If you'd like to contribute to the project, please fork the repository and create a pull request with your changes. Follow the coding standards and write tests for your new features.

---

## License

This project is licensed under the MIT License.
