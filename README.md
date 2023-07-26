# Node.js, Express.js, and MongoDB Backend using MVC Pattern with JWT Authentication and Authorization

![Project Logo](https://your-image-url.com)

This repository contains the backend implementation for a Node.js application built with Express.js and MongoDB, following the Model-View-Controller (MVC) pattern. The backend provides JWT (JSON Web Token) based authentication and authorization mechanisms, along with protected routes to secure access to specific resources. The server exposes RESTful API endpoints to interact with the application.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [MVC Pattern](#mvc-pattern)
- [Authentication and Authorization](#authentication-and-authorization)
- [Protected Routes](#protected-routes)
- [RESTful API Endpoints](#restful-api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This backend implementation follows the Model-View-Controller (MVC) pattern, providing a structured way to organize code and separate concerns. It uses Node.js and Express.js to create a robust backend server, with MongoDB as the database for storing application data.

## Features

- MVC pattern for organized code structure
- JWT-based user authentication and authorization
- Securely hashed passwords for enhanced security
- Protected routes to restrict access to authenticated users
- RESTful API endpoints for interacting with the application

## Installation

Follow these steps to set up and run the backend locally:

1. Clone the repository:

```bash
git clone https://github.com/oolaoluwatobi/server-van-life-app-mern.git
```

2. Change into the project directory:

```bash
cd server-van-life-app-mern
```

3. Install the required dependencies:
```bash
npm install
```

## Usage

To start the backend server, use the following command:

```bash
npm start
```

The server will start running on `http://localhost:5000`

## MVC Pattern

The backend follows the MVC pattern to structure the code into separate modules:

- Models:  Define data models and interact with the database.
- Views: Handle presentation and rendering of data.
- Controllers:  Manage the application's logic and serve as an intermediary between models and views.

```bash
├── controllers
│   ├── authController.js
│   ├── resourceController.js
│   └── ...
├── models
│   ├── userModel.js
│   ├── resourceModel.js
│   └── ...
├── views
│   ├── userView.js
│   ├── resourceView.js
│   └── ...
└── app.js
```

##  Authentication and Authorization

The backend provides JWT-based authentication for user registration and login. When a user registers or logs in, the server generates a JWT token and sends it back to the client. This token is used for subsequent API requests to authenticate the user.

Password handling is secure, as the backend stores only salted and hashed passwords in the database.

##  Protected Routes

Protected routes ensure that only authenticated users with valid JWT tokens can access certain endpoints. Middleware is used to verify the token's validity and grant access to authorized users.

```bash
// Example of a protected route
const express = require('express');
const router = express.Router();
const { protectRoute } = require('../middleware/authMiddleware');

router.get('/protected-resource', protectRoute, (req, res) => {
  // Handle the protected route logic here
  res.json({ message: 'This is a protected resource.' });
});

module.exports = router;

```

In the above example, the `protectRoute` middleware ensures that the request is authorized before accessing the "protected-resource" endpoint.

## RESTful API Endpoints

The backend provides RESTful API endpoints for interacting with the application. Some common endpoints include:

- User registration: `POST /register`
- User login: `POST /auth`
- Accessing user profile: `GET /users/:id`
- Creating a new van profile: `POST /vans`
- Updating a van: `PUT /vans`
- Deleting a van: `DELETE /vans/:id`

Please refer to the source code for a complete list of available endpoints and their functionalities.

## Contributing

We welcome contributions from the community! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or create a pull request.

Thank you for using this Node.js, Express.js, and MongoDB backend with MVC pattern! I hope this implementation of JWT authentication, protected routes, and RESTful API endpoints serves as a helpful reference for your projects. Happy coding!
