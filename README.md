# URL Shortener (Full Stack)
**Shorty** is a complete URL Shortener application with a **React frontend**, a **Node.js/Express backend**, and **MongoDB Atlas database**, all deployed on **Render** at:  
➡️ [Shorty](https://shortyapp.onrender.com)

## Live Demo
Explore the live application here: [https://shortyapp.onrender.com](https://shortyapp.onrender.com)

## Table of Contents
1. [Overview](#overview)  
2. [Features](#features)  
3. [Architecture](#architecture)  
4. [Tech Stack](#tech-stack)  
5. [Clean Code & Testing](#clean-code--testing)  
6. [Installation & Local Development](#installation--local-development)  
7. [Docker & Deployment](#docker--deployment)  
8. [Environment Variables](#environment-variables)  

## Overview
This project implements a URL shortening service:

- Shorten long URLs to concise links  
- Redirect short links to originals  
- User accounts with JWT authentication  
- Admin-only user management  
- App search via Google Custom Search  
- Profile editing, search, pagination, and responsive UI  

Both frontend and backend follow **Clean Architecture** principles, are covered by unit/integration tests, and are deployed via Docker on Render.


## Features
- 🔗 **URL Shortening & Redirect**  
- 🔐 **User Authentication & Profiles**  
- 👤 **Admin User Management**  
- 🗂️ **URL Management (list, delete, search)**  
- 🔍 **App Search**  
- ✏️ **Profile Update**  
- 📱 **Fully Responsive UI**  
- 🐳 **Dockerized**

## Architecture

I organized both the frontend and backend using **Clean Architecture**, so each part has a clear responsibility:

- **/frontend-app**

   This folder is purely presentation: all my React components, pages, and context live here. It’s focused on how the user sees and interacts with the app.

- **/backend-app**
  
  I split the server code into four layers:
  - **domain/**

 
     This is the heart of my app’s logic—it defines core models and the interfaces they must adhere to, without any dependency on Express or MongoDB.

   - **usecases/**

     Here I implement each business operation—“log in a user,” “list users,” etc. .

   - **infrastructure/**

     This layer contains the real implementations: Mongoose/ MongoDB repositories repositories, Google Search integration. They satisfy the interfaces defined in domain/ so I can swap them out easily if I ever change technologies.

    - **interface/**

       This is the glue between HTTP and my use cases. Express route handlers, translating incoming requests into calls to my use-case functions and packaging their results back into HTTP responses.

## Tech Stack

- **Frontend**: React v19, React Router, Bootstrap  
- **Backend**: Node.js, Express, MongoDB Atlas, Mongoose  
- **Auth**: JSON Web Tokens (JWT)  
- **Search**: Google Custom Search API  
- **Tests**: Jest, Supertest (backend); Jest, Cypress (frontend)  
- **Docs**: Swagger UI  
- **Containerization**: Docker, Docker Compose  
- **Hosting**: Render (Docker images)


## Clean Code & Testing

- **Clean Code**: Descriptive naming, single-responsibility, minimal comments.  
- **Unit Tests**: Core logic (services, use cases).  
- **Integration Tests**: API routes with an in-memory database.  
- **E2E Tests**: Frontend user flows with Cypress.  
- **Swagger**: Interactive API docs at `/api-docs` on your backend URL.


## Installation & Local Development

```bash
# 1. Clone monorepo
git clone https://github.com/BeldiMariem/URLShortener.git
cd URLShortener

# 2. Backend
cd backend-app
cp .env .env      # fill in your variables
npm install
npm run dev              

# 3. Frontend
cd ../frontend-app
cp .env .env      # set REACT_APP_API_URL=http://localhost:5000
npm install
npm start   
```
## Docker & Deployment
**Build & run locally with Docker Compose (from repo root):**
```bash
docker-compose up --build
```
- **Frontend** → http://localhost:3000

- **Backend** → http://localhost:5000

**Deployed on Render using Docker images:**

- **Frontend**: mariem19/urlshortener-frontend

- **Backend**: mariem19/urlshortener-backend

Access the live app at [https://shortyapp.onrender.com](https://shortyapp.onrender.com)

## Environment Variables
```bash
# backend-app/.env
JWT_SECRET=your_jwt_secret
PORT=5000
MONGO_URI=your_mongo_connection_string
BASE_URL=http://localhost:5000
GOOGLE_API_KEY=your_google_api_key
GOOGLE_CX_ID=your_google_cx_id

# frontend-app/.env
REACT_APP_API_URL=http://localhost:5000
```

## 
> **Note:** For detailed setup and usage of each service, see the individual READMEs:
> - [Frontend Details](./frontend-app/README.md)  
> - [Backend Details](./backend-app/README.md)






##


### Built with ❤️ by Mariem BELDI

##
