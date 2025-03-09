# Product Inventory Server

## Overview
This is a **Product Inventory Server** built using **Node.js, Express.js, and Mongoose**. The server includes authentication and authorization using **JWT**, with role-based access control to restrict certain actions to **admins only**. It also implements a **refresh token mechanism** for seamless user authentication.

## Features
- **User Authentication & Authorization**
  - Register a new user (`/registration`)
  - Login and receive **access & refresh tokens** (`/login`)
  - Automatic token renewal using refresh token (`/refresh_token`)
  
- **User Management (Admin Only)**
  - Get all users (`/users`)
  - Update a user (`/user/:id`)
  - Delete a user (`/user/:id`)
  
- **Product Management**
  - Get all products (Public) (`/products`)
  - Get a single product (Public) (`/product/:id`)
  - Create a new product (Admin Only) (`/products`)
  - Update a product (Admin Only) (`/product/:id`)
  - Delete a product (Admin Only) (`/product/:id`)

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Vercel

## Middleware
- **Authentication Middleware:** Ensures users are logged in before accessing protected routes.
- **Authorization Middleware:** Checks if the user is an **admin** before allowing access to admin-only routes.

## Authentication Flow
1. User logs in via `/login` and receives an **access token** and **refresh token** (stored in HTTP-only cookie).
2. Access token expires after a short period.
3. When expired, the frontend calls `/refresh_token` with the refresh token to get a new access token.
4. If the refresh token is valid, a new access token is issued; otherwise, the user must log in again.

## Installation & Setup
### 1. Clone the Repository
```bash
git clone https://github.com/Nazmul580/ic_backend_project.git
cd ic_project
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure it:
```
PORT=your_port_number
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
FRONTEND_URL=*
```
_Note: `FRONTEND_URL=*` allows requests from any origin during development/testing._

### 4. Run the Server
```bash
npm start
```
Server will run on `http://localhost:your_port_number`

## Deployment
To deploy the project on **Vercel**:
1. Push the project to **GitHub**.
2. Connect the repository to **Vercel**.
3. Add environment variables on Vercel.
4. Deploy and get your live API endpoint.

## API Endpoints
| Method | Endpoint         | Description           | Access |
|--------|-----------------|-----------------------|--------|
| POST   | /registration   | Register a user      | Public |
| POST   | /login          | User login           | Public |
| POST   | /refresh_token  | Get new access token | Public |
| GET    | /users          | Get all users        | Admin  |
| PATCH  | /user/:id       | Update user          | Admin  |
| DELETE | /user/:id       | Delete user          | Admin  |
| GET    | /products       | Get all products     | Public |
| GET    | /product/:id    | Get product by ID    | Public |
| POST   | /products       | Create product       | Admin  |
| PATCH  | /product/:id    | Update product       | Admin  |
| DELETE | /product/:id    | Delete product       | Admin  |

## Author
Developed by **Nazmul Hossen**.

## Test Credentials
For testing private routes, use the following login credentials:
```json
{
  "email": "nazmul@nazmul.com",
  "password": "12345678"
}
```

