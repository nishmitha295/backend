# Backend - User Management & Dashboard System

This is the backend of the **User Management & Dashboard System**, built with **Node.js**, **Express.js**, and **MySQL**. It provides RESTful API endpoints for user authentication and dashboard data like customers and tickets.

---

## Technologies Used

- Node.js  
- Express.js  
- MySQL  
- JWT (for authentication)  
- bcrypt (for password hashing)  
- dotenv  
- Postman (for testing APIs)

---

## Features

- **User Authentication**
  - Sign Up
  - Sign In
  - Reset Password
  - New Password (via token)

- **Dashboard APIs**
  - View Customers
  - View Tickets

- **Security**
  - Password hashing using bcrypt
  - JWT-based token authentication

---

## Backend Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/yourusername/user-dashboard.git
   ```

2. **Navigate to the Backend Folder**  
   ```bash
   cd user-dashboard/backend
   ```

3. **Install Dependencies**  
   ```bash
   npm install
   ```

4. **Configure Environment Variables**  
   Create a `.env` file and add your MySQL and JWT credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=yourpassword
   DB_NAME=user_dashboard
   JWT_SECRET=your_jwt_secret
   ```

5. **Set Up the Database**  
   - Use the provided `database.sql` file to create necessary tables.
   - Example command:
     ```bash
     mysql -u root -p user_dashboard < database.sql
     ```

6. **Start the Backend Server**  
   ```bash
   npm start
   ```

   Server will run on `http://localhost:5000`.

---

## API Endpoints

### 🔐 Authentication Routes

- **POST /api/auth/signup**  
  Register a new user  
  **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /api/auth/signin**  
  Log in a user and return a JWT  
  **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **POST /api/auth/reset-password**  
  Send a reset link to user's email  
  **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```

- **POST /api/auth/new-password**  
  Reset password using token  
  **Request Body**:
  ```json
  {
    "token": "reset-token",
    "newPassword": "newPassword123"
  }
  ```

---

### 📊 Dashboard Routes

- **GET /api/dashboard/customers**  
  Get all customers linked to the logged-in user  
  **Headers**:
  ```
  Authorization: Bearer <your_token>
  ```

- **GET /api/dashboard/tickets**  
  Get all tickets linked to the logged-in user  
  **Headers**:
  ```
  Authorization: Bearer <your_token>
  ```

---

## Testing with Postman

1. Test each endpoint with appropriate request body and headers.
2. Use the **Bearer token** returned from `/api/auth/signin` for accessing protected routes.
3. Use collections and environment variables in Postman to manage URLs and tokens.

---

## Project Structure

```
backend/
├── controllers/        # Business logic for routes
├── models/             # MySQL database queries and config
├── routes/             # API route definitions
├── server.js           # Entry point of backend
├── database.sql        # SQL file to create tables
├── .env                # Environment variables
└── package.json
```

---

## Best Practices

- Validate all user inputs
- Use HTTPS in production
- Secure `.env` file and never commit it
- Handle errors properly and return appropriate status codes
- Sanitize inputs to prevent SQL injection

---

## License

This project is licensed under the MIT License.

