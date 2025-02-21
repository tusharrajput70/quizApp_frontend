# Quiz App

A full-stack quiz application built using **React, Node.js, Express, and MongoDB**. Users can attempt quizzes, track their scores, and view their quiz history.

## Features

- **Take Quizzes:** Answer multiple-choice and integer-type questions.
- **Timer-Based Questions:** Each question must be answered within a set time.
- **Score Tracking:** Keeps track of the user's performance.
- **Quiz History:** View previous quiz attempts.
- **Responsive UI:** Clean and interactive frontend using React.

## Running the App Locally

### Prerequisites

Ensure you have the following installed:
- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/quiz-app.git
   cd quiz-app
   ```
2. Install dependencies:
   ```sh
   cd backend
   npm install
   ```
3. Set up your MongoDB database and update the connection string in `connectToMongoDB.js`.
4. Start the backend server:
   ```sh
   npm start
   ```
   The server will run at `http://localhost:5500`.

### Frontend Setup

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm run dev
   ```
   The frontend will run at `http://localhost:3000`.

## API Endpoints

### Questions
- `GET /api/questions` - Fetch all quiz questions.

### Quiz History
- `POST /api/quiz-history` - Save user quiz history.
- `GET /api/quiz-history?username={username}` - Get quiz history for a specific user.

## Deployed App

Check out the live version here: [Quiz App](https://tusharrajputquiz.vercel.app/)

---

