# Authentication and Registration API

This scaffold provides authentication and registration endpoints using JWT for secure token-based authentication in Node.js. It utilizes `Express.js`, `Sequelize` (for MySQL), `bcrypt` for password hashing, and `jsonwebtoken` for JWT handling. It also includes middleware for protecting routes with token authentication.

## Features
- **User Registration**: Allows new users to register with email, password, age, grade level, and preferred language.
- **User Login**: Validates user credentials and generates a JWT token upon successful login.
- **Protected Routes**: Implements middleware to protect routes using JWT.

## Technologies Used
- **Node.js** (Express.js)
- **Sequelize** (MySQL)
- **JWT** (jsonwebtoken)
- **bcrypt.js** (for password hashing)
- **Joi** (for validation)

## Endpoints
   - [POST /api/v1/users/register](#post-apiv1usersregister)
   - [POST /api/v1/users/login](#post-apiv1userslogin)
   - [GET /api/v1/users/:user_id](#get-apiv1usersuser_id)

## Installation
1. Clone the repository:
```bash
    git clone https://github.com/yourusername/yourproject.git
    cd yourproject
 ```

2. Install dependencies:
```bash
    npm install
 ```

3. Set up your environment variables in a .env file:
```bash
    touch .env
 ```
