# Comment System

## Overview

This is a comment system built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and JWT authentication.

## Requirements

- Node.js
- MongoDB

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    cd comment-system
    ```

2. Install the dependencies:

    cd into backend and run: 

    ```bash
    npm install
    ```

    cd into frontend and run: 

    ```bash
    npm install
    ```

Rename the `.env.example` to `.env` file  in the backend root directory and add your MongoDB URI and JWT secret. i have added mongodb atlas dummy database.

    ```env
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ```

4. Run the Application:

    cd into backend root and run this command:

    ```bash
        npm run start:all
    ```

## API Endpoints

- **POST /api/auth/register**: Register a new user
- **POST /api/auth/login**: Login a user
- **GET /api/comments**: Get all comments
- **POST /api/comments**: Add a new comment (protected)
- **PUT /api/comments/:id/like**: Like a comment (protected)
- **PUT /api/comments/:id/dislike**: Dislike a comment (protected)
- **POST /api/comments/:id/reply**: Reply to a comment (protected)

