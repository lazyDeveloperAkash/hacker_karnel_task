# Project Documentation

## Live Links
- **Live Demo**: https://hacker-kernel-task.netlify.app/

---

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js**: Version 14 or above
- **npm**: Comes with Node.js

### Steps to Install
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## Features

### Authentication
- Login functionality using **Reqres API**.
- Stores a user token in local storage upon successful login.
- Redirects based on authentication state:
  - `/dashboard` if logged in.
  - `/` if not authenticated or token is removed.

### Dashboard
- Displays a list of products.
- Products can be searched dynamically.
- Animation on product addition and removal:
  - Newly added products slide in with an animation.
  - Removed products animate out, and the remaining cards adjust their positions smoothly.

### Create Product Modal
- Modal to add new products with the following fields:
  - **Name**: Unique product name validation.
  - **Price**: Price input with validation to remove leading zeros.
- Newly added product animates into the list.

### Responsive Design
- Mobile-friendly layout using **Tailwind CSS**.
- Consistent design and animations for a polished user experience.

### Icons and Animations
- Uses **React Icons** for interactive elements.
- Smooth hover and click animations for a modern UI feel.

---

## Technology Stack

- **React.js**: Frontend framework.
- **React Router**: For routing.
- **Tailwind CSS**: For styling and responsiveness.
- **Axios**: For API requests.
- **React Toastify**: For user messages.

---

## Future Enhancements

- Add a backend API for production-ready authentication and product management.
- Implement persistent state management using Redux or Context API.
- Add unit tests with Jest and React Testing Library.