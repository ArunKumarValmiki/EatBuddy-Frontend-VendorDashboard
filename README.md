### 🚀 Live Frontend (Vendor Dashboard)

The frontend is deployed and accessible at :

🔗 [https://eat-buddy-frontend-vendor-dashboard.vercel.app](https://eat-buddy-frontend-vendor-dashboard.vercel.app)

---

### 🛠️ Live Backend API

The backend is deployed and accessible at *(hosted on Render – may take 1 to 2 minutes during the initial load)*:

🔗 [https://eatbuddy-backend-vendordashboard.onrender.com](https://eatbuddy-backend-vendordashboard.onrender.com)

---

# EatBuddy-Frontend-VendorDashboard

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E0?style=for-the-badge&logo=axios&logoColor=white)

## Table of Contents

- [About The Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Backend Dependency](#backend-dependency)
- [Author](#author)

---

## About The Project

This repository contains the frontend application for the **EatBuddy Vendor Dashboard**. It provides a dedicated web interface for restaurant owners or food vendors to manage their presence on the EatBuddy platform. Vendors can register, log in, manage their firm details, and handle their menu by adding, updating, and deleting food products.

This application communicates with the [EatBuddy-Backend](https://github.com/ArunKumarValmiki/EatBuddy-Backend) to perform all data operations.

## Features

* **Vendor Registration & Login:** Allows new vendors to sign up and existing vendors to log in securely.
* **Firm Management:** Vendors can add or update details about their food firm/restaurant.
* **Product Management:** Provides an interface for vendors to add new food items, view their existing menu, and delete products.
* **User Interface:** A responsive and intuitive user interface designed for vendor operations.

## Tech Stack

* **React.js:** A JavaScript library for building user interfaces.
* **React Router DOM:** For declarative routing within the single-page application.
* **Axios:** Promise-based HTTP client for making API requests to the EatBuddy Backend.
* **HTML/CSS:** For structuring and styling the user interface.

## Architecture

The Vendor Dashboard is structured as a single-page application (SPA) using React's component-based architecture. Key components are organized into logical sections (e.g., `components`, `pages`) to promote reusability and maintainability. It primarily interacts with the backend via RESTful API calls.

## Getting Started

Follow these steps to set up and run the EatBuddy Frontend Vendor Dashboard locally for development.

### Prerequisites

* Node.js (LTS version recommended)
* npm (Node Package Manager) or Yarn
* **Running EatBuddy-Backend:** This frontend requires the backend server to be running or deployed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ArunKumarValmiki/EatBuddy-Frontend-VendorDashboard.git
    cd EatBuddy-Frontend-VendorDashboard
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Configure Backend API URL:**
    Create a `.env` file in the root of the project (if not already present) and add your backend API URL:
    ```env
    REACT_APP_BACKEND_URL=[https://eatbuddy-backend-vendordashboard.onrender.com](https://eatbuddy-backend-vendordashboard.onrender.com)
    ```
    *Note: Adjust the URL if you're running the backend locally (e.g., `http://localhost:5000`).*

### Running the Application

To start the development server:
```bash
npm start
# or
yarn start
```

### Backend Dependency
**This frontend application relies entirely on the EatBuddy-Backend for all data storage and retrieval. Please ensure the backend server is running and accessible at the URL configured in your .env file. Refer to the backend's README for its setup instructions and API documentation.**

---

## Author
### Arun Kumar Valmiki
