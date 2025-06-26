# URL Shortener Frontend

This is the frontend for the URL Shortener application, built with **React (v19.1.0)**. It allows users to input a long URL, shorten it, and view the shortened URL.

## Table of Contents
1. [Features](#features)
2. [Clean Architecture](#clean-architecture)
3. [Clean Code Approach](#clean-code-approach)
4. [Testing](#testing) 
5. [Installation](#installation)
6. [Docker](#Docker)
7. [Available Scripts](#available-scripts)
8. [Usage](#usage)

## Features
- 🔗 **Shorten URLs:** Users can input a long URL and get a shortened version.
- 🔄 **Redirect:** Users can click on the shortened URL to be redirected to the original URL.
- 🔐 **User Authentication:** Secure login and registration with token-based authentication.
- 🗂️ **URL Management**: Users can view and delete their shortened URLs.
- 👤 **User Management**: Token-based authentication system with role-based access control. Only administrators can access user-related operations such as listing, updating, or deleting users.
- 🔍 **Search Functionality**: Users can search URLs or apps efficiently.
- ✏️ **Profile Update**: Users can update their profile details such as name, email, and password securely.

## Clean Architecture
I decided to follow **Clean Architecture** to keep the app well-structured, easy to test, and scalable in the long run. Each layer has a clear responsibility — which really helped me stay organized.

- **Domain:** Contains the core business models and logic.

- **Application:** Manages use cases that coordinate domain logic.

- **Infrastructure:** Deals with external systems like API requests.

- **Presentation (UI):** Built with React, this layer handles everything the user interacts with.


##  Clean Code Approach
I made a conscious effort to follow clean code principles to ensure the code is easy to read, maintain, and extend. I believe that well-written code should speak for itself, so I focused on making it clear and intuitive, minimizing the need for comments. I spent time ensuring that variables and functions have names that clearly describe their purpose, which helps anyone reading the code understand what’s happening right away.

This approach ensures that anyone reviewing or extending the project can quickly understand the logic and confidently make changes without confusion.

## Testing
- **Unit Tests**: Test core logic such as authentication services and URL operations using **Jest**.

- **End-to-End Tests**: Use **Cypress** to simulate real user journeys and ensure the app works as expected from the UI perspective.

## Installation

 **1. Clone the repository:**

```bash
git clone https://github.com/BeldiMariem/URLShortenerApp.git
```
```bash
cd frontend-app
```
**2. Install dependencies:**
```bash
npm install
```
**3. Create a .env file at the root and add:**
```bash
REACT_APP_API_URL=http://localhost:5000
```
**4. Start the development server:**
```bash
npm start
```
##  🐳 Docker
### Build & Run with Docker**
```bash
# from frontend-app folder
docker build -t urlshortener-frontend .
docker run -p 5000:5000 --env-file .env urlshortener-frontend
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
   npm start
    ```
Runs the app in development mode.
##
-  ```bash
   npm test
    ```
Launches the test runner in interactive watch mode.
##
- ```bash
  npx cypress open
    ```
Opens the Cypress Test Runner for end-to-end testing.
Make sure both the frontend and backend servers are running before starting the tests.

## Usage

After starting the development server, open your browser and go to [http://localhost:3000](http://localhost:3000).

**1. Register or Login**
- To get started, create an account via the **Register** page.
- If you already have an account, simply login using your credentials.
- Upon successful authentication, you will be redirected to the homepage.

**2. Update Your Profile**

- Edit your account details such as name, email, and password to keep your profile up to date.

**3. Shorten a URL**

- Once logged in, enter a long URL into the input field.
- Click the **"Shorten"** button.
- A shortened URL will be generated and displayed.

**4. Manage Your URLs**

- View a list of all the URLs you’ve shortened.
- Delete any URL you no longer need.
- (Optional) Search through your shortened URLs by title.

**5. Redirect to Original URL**

- Click any short URL to be instantly redirected to the original destination.

**6. Search for Apps**

- Enter the name of any app in the search field. The app’s link will be retrieved and displayed.

##

### Built with ❤️ by Mariem BELDI
