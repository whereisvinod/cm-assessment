# CM Assessment - Angular Interview Task

## Overview

This is a simple Angular application demonstrating:

- User authentication via cookies.
- Protected routes for dashboard and list pages.
- API integration for login and list of items.
- Modular and reusable components.
- Lazy-loaded modules for optimized routing.

---

## Features

### 1. Login Page
- Form with **email** and **password** fields.
- Authenticate the user using the mock API (`POST /api/login`).
- Store authentication token in **cookies**.
- Redirect to dashboard after successful login.

### 2. Authentication Handling
- Uses cookies for auth (`ngx-cookie-service`).
- Dashboard and list pages are **protected routes**.
- Logout clears cookies and redirects to login.

### 3. Dashboard Page
- Displays a welcome message with the logged-in user's email.
- Navigation link to the **List** page.
- Logout button.

### 4. List Page
- Fetches and displays items from the mock API (`GET /api/items`).
- Loading and error states implemented.

---

## Tech Stack

- Angular (v19)
- Angular Material (UI components)
- RxJS for API handling
- ngx-cookie-service for cookie-based authentication
- Jasmine/Karma for unit testing

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/whereisvinod/cm-assessment.git
cd cm-assessment
```

### 2. Install the dependencies

```bash
npm install
```

### 3. Run the application

```bash
ng serve
```

### 4. Run unit tests

```bash
ng test
```

## Login (Mock data)

- test@example.com / 123456

