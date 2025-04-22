This is the backend code of User 


## Backend Setup

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/yourusername/user-dashboard.git
   ```
   
2. **Navigate to the backend directory**:
   ```bash
   cd user-dashboard/backend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Configure MySQL**:
   - Create a MySQL database and tables using the provided schema (the SQL queries should be in a `database.sql` file).
   - Update your MySQL credentials in the `.env` file.

5. **Start the backend server**:
   ```bash
   npm start
   ```

   The backend will be available at `http://localhost:5000`.

---

## API Endpoints

### Authentication Endpoints

- **POST /api/auth/signup**
  - **Description**: Registers a new user.
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **POST /api/auth/signin**
  - **Description**: Logs in an existing user and returns a JWT token.
  - **Body**:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **POST /api/auth/reset-password**
  - **Description**: Sends a reset password link to the user's email.
  - **Body**:
    ```json
    {
      "email": "user@example.com"
    }
    ```

- **POST /api/auth/new-password**
  - **Description**: Resets the password using the token sent to the user's email.
  - **Body**:
    ```json
    {
      "token": "reset-token",
      "newPassword": "newPassword123"
    }
    ```

---

### Dashboard Endpoints

- **GET /api/dashboard/customers**
  - **Description**: Fetches all customers associated with the logged-in user.
  - **Response**:
    ```json
    [
      {
        "customerId": 1,
        "name": "John Doe",
        "email": "john@example.com"
      },
      ...
    ]
    ```

- **GET /api/dashboard/tickets**
  - **Description**: Fetches all tickets associated with the logged-in user.
  - **Response**:
    ```json
    [
      {
        "ticketId": 1,
        "title": "Issue with login",
        "status": "Open"
      },
      ...
    ]
    ```

---

## Testing with Postman

You can test all the API endpoints using **Postman**.

1. **Authentication Endpoints**:
   - Test the **Sign Up**, **Sign In**, and **Reset Password** endpoints by sending the corresponding HTTP requests (POST requests).
   - Make sure to test with both valid and invalid data for each endpoint.
   
2. **Dashboard Endpoints**:
   - After successfully logging in and obtaining a token, use it in the **Authorization** tab of Postman as a Bearer token for protected routes (like `/api/dashboard/customers` and `/api/dashboard/tickets`).

---

## Contributing

1. **Fork the repository**.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/yourusername/user-dashboard.git
   ```
3. **Create a new branch**:
   ```bash
   git checkout -b new-feature
   ```
4. **Make your changes** and **commit** them:
   ```bash
   git commit -m "Add new feature"
   ```
5. **Push** to your fork:
   ```bash
   git push origin new-feature
   ```
6. **Create a pull request** from your fork to the main repository.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Example of Project Structure

```
user-dashboard/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── .env
│   └── database.sql
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   └── package.json
├── .gitignore
└── README.md
```

---

### Best Practices & Tips

- **Error Handling**: Implement proper error handling in both frontend and backend to provide meaningful error messages.
- **Security**: Use **bcrypt** for password hashing and **JWT** for token authentication in the backend.
- **Testing**: Continuously test your API using **Postman** and ensure that your frontend interacts correctly with the API.
- **Styling**: Utilize **Bootstrap** components in the frontend for responsive and modern design.

---
