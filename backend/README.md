# SavingsYogi Backend

This is the backend API server for the SavingsYogi application. It is built with Node.js, Express, and MongoDB, providing RESTful endpoints for user authentication, blog management, contact forms, and feedback handling.

## Features

- User authentication and authorization
- Blog addition and management
- Contact form handling
- Feedback submission
- Secure API with JWT and cookie-based authentication
- MongoDB database integration with Mongoose

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcryptjs for password hashing
- dotenv for environment variable management
- cors for Cross-Origin Resource Sharing
- cookie-parser for cookie handling
- multer for file uploads
- nodemailer for sending emails

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

## Running the Server

- To start the server:
  ```bash
  npm start
  ```

- For development with automatic restarts:
  ```bash
  npm run index
  ```

- To run both backend and frontend concurrently (if frontend script is defined):
  ```bash
  npm run dev
  ```

The server will run on the port specified in the `.env` file (default is 8000).

## API Routes Overview

- `POST /api/v1/auth` - Authentication routes (login, register, etc.)
- `GET/POST /api/v1/users` - User management routes
- `GET/POST /api/v1/addBlogRoute` - Blog addition and management
- `GET/POST /api/v1/contact` - Contact form submission
- `GET/POST /api/v1/feedback` - Feedback submission

## Project Structure

- `Controllers/` - Contains route handler logic for different features
- `models/` - Mongoose schemas and models
- `routes/` - Express route definitions
- `utils/` - Utility functions such as email sending and token verification
- `index.js` - Main server entry point

## License

This project is licensed under the ISC License.
