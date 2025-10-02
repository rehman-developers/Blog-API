# Blog Management API

## Overview
This is a RESTful API for managing blogs, built with Node.js and Express.js. It includes user registration and login (using session-based authentication, no JWT), full CRUD operations for blog posts, image upload support using Multer, input validation, and error handling. The API uses MySQL as the database (via XAMPP) and follows best practices for modular structure and separation of concerns. No frontend is included.

## Features
- User authentication: Register and login with secure password hashing (bcrypt).
- Blog CRUD: Create, read, update, and delete blogs (restricted to authenticated authors).
- Image upload: Support for uploading images to blogs using multipart/form-data.
- Validation: Input validation for all endpoints.
- Error handling: Appropriate HTTP status codes and messages for errors.
- Modular structure: Routes, controllers, models, middlewares, etc.
- Bonus: Pagination and search in blog listing (GET /blogs?search=keyword&page=number).

## Tech Stack
- Node.js
- Express.js
- MySQL (with mysql2 driver)
- bcryptjs for password hashing
- multer for file uploads
- express-session for session management
- dotenv for environment variables

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/rehman-developers/Blog-API
   cd blog-api
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Set up the database:
   - Install XAMPP and start MySQL.
   - Create a database named `blog_api_db` in phpMyAdmin.
   - Run the following SQL queries to create tables:
     ```sql
     CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       username VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

     CREATE TABLE blogs (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       content TEXT NOT NULL,
       authorId INT NOT NULL,
       imageUrl VARCHAR(255),
       createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
       FOREIGN KEY (authorId) REFERENCES users(id)
     );
     ```
4. Create a `.env` file in the root directory with the following:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=blog_api_db
   SESSION_SECRET=super_secret_key
   PORT=3000
   ```

## Running Locally
1. Start the server:
   ```
   node app.js
   ```
2. The API will be available at `http://localhost:3000`.
3. Use Postman or a similar tool to test the endpoints.

## API Endpoints

### User Authentication
- **POST /users/register**  
  Register a new user.  
  Body: `{ "username": "string", "email": "string", "password": "string" }`  
  Response: 201 { "message": "User registered" }

- **POST /users/login**  
  Login an existing user (sets session).  
  Body: `{ "email": "string", "password": "string" }`  
  Response: 200 { "message": "Logged in", "user": { "id": number, "email": "string" } }

### Blog Posts
- **POST /blogs** (Authenticated)  
  Create a new blog.  
  Body (multipart/form-data): `title` (string), `content` (text), `image` (file, optional)  
  Response: 201 { "message": "Blog created", "blogId": number }

- **GET /blogs**  
  List all blogs (public, with optional pagination and search).  
  Query Params: `search=keyword` (optional), `page=number` (optional, default 1)  
  Response: 200 [array of blogs]

- **GET /blogs/:id**  
  Get a single blog (public).  
  Response: 200 { blog object }

- **PUT /blogs/:id** (Authenticated, author only)  
  Update a blog.  
  Body (multipart/form-data): `title` (string), `content` (text), `image` (file, optional)  
  Response: 200 { "message": "Blog updated" }

- **DELETE /blogs/:id** (Authenticated, author only)  
  Delete a blog.  
  Response: 200 { "message": "Blog deleted" }

## Testing
- Use Postman to test endpoints.
- For authenticated routes, login first to set the session cookie.
- Optional Postman Collection: Download from [blog-api.postman_collection.json](blog-api.postman_collection.json) in the repo.

## Bonus Features Implemented
- Pagination and search in GET /blogs (e.g., ?search=blog&page=1).
- Basic session handling with cookies.
- Profile update endpoint (PUT /users/:id, authenticated).

## Troubleshooting
- Ensure XAMPP MySQL is running.
- Check console logs for errors.
- For image uploads, ensure `uploads` folder exists and is writable.

## License
MIT License. See LICENSE file for details.