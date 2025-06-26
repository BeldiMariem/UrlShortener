# URL Shortener Backend

This is the backend for the URL Shortener application, built with **Node.js** and **Express**. It provides RESTful APIs for:
- User authentication (JWT)

- URL creation, listing, deletion

- User management (admin only)

- App search via Google Custom Search

- **Database:** MongoDB Atlas


The code follows **Clean Architecture** and **Clean Code principles**, is fully **tested** with Jest & Supertest, documented with **Swagger**, and ready to run in **Docker**.

## Table of Contents
1. [Features](#features)
2. [Clean Architecture](#clean-architecture)
3. [Clean Code Approach](#clean-code-approach)
4. [API Documentation (Swagger)](#api-documentation-(swagger)) 
5. [Testing](#testing) 
6. [Installation](#installation)
7. [Environment Variables](#environment-variables)
8. [Docker ](#docker)
9. [Available Scripts](#available-scripts)

## Features
- 🔐 Authentication: Register, login, logout with JWT tokens.

- 🔗 URL Management: Create, list, delete shortened URLs.

- 👤 User Management: Admin-only routes to list, update, delete users.

- 🔍 App Search: Search any app by name using Google Custom Search.

- ⚠️ Validation & Error Handling: Joi for request validation; consistent error responses.

- 🐳 Dockerized: Easily build and run via Docker & Docker Compose.

## Clean Architecture
I decided to follow **Clean Architecture** to keep the app well-structured, easy to test, and scalable in the long run. Each layer has a clear responsibility — which really helped me stay organized.

- **domain**  
  Defines the core business models (`User`, `Url`, etc.) and interfaces (e.g. `IUserRepository`) with **no external dependencies**.

- **usecases**  
  Implements each application operation (login, createUrl, listUsers, etc.) by orchestrating domain models and repository interfaces.

- **infrastructure**  
  Provides concrete implementations of domain interfaces: Mongoose/ MongoDB repositories, Axios wrappers, Google Search integration.

- **interface**  
  Contains Express controllers, route definitions and Joi schemas to adapt HTTP requests/responses to the use‐case layer.


##  Clean Code Approach
I made a conscious effort to follow clean code principles to ensure the code is easy to read, maintain, and extend. I believe that well-written code should speak for itself, so I focused on making it clear and intuitive, minimizing the need for comments. I spent time ensuring that variables and functions have names that clearly describe their purpose, which helps anyone reading the code understand what’s happening right away.

This approach ensures that anyone reviewing or extending the project can quickly understand the logic and confidently make changes without confusion.

## API Documentation (Swagger)
Visit **/api-docs** after starting the server to explore and try out all routes.


## Testing
- **Unit Tests (Jest)**: Test individual modules (services, utils).

- **Integration Tests (Supertest)**: pin up an in-memory MongoDB to test API endpoints end-to-end.

## Installation

 **1. Clone the repository:**

```bash
git clone https://github.com/BeldiMariem/URLShortenerApp.git
```
```bash
cd backend-app
```
**2. Install dependencies:**
```bash
npm install
```
**3. Create a .env file (see next section)**

**4. Start the development server:**
```bash
npm run dev
```
## Environment Variables

Create a .env in backend-app/ with:
```bash
JWT_SECRET=your_jwt_secret
PORT=5000
MONGO_URI=your_mongo_connection_string
BASE_URL=http://localhost:5000
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX_ID=your_google_cx_id
```
##  🐳 Docker
### Build & Run with Docker**
```bash
# from backend-app folder
docker build -t urlshortener-backend .
docker run -p 5000:5000 --env-file .env urlshortener-backend
```
### With Docker Compose
```bash
# from app folder
docker-compose up --build
```

## Available Scripts
In the project directory, you can run:
##
-  ```bash
   npm run dev
    ```
Runs the app in development mode.
##
-  ```bash
   npm test
    ```
Launches the test runner in interactive watch mode.


##
### Built with ❤️ by Mariem BELDI

##
