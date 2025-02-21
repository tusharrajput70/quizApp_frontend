import { useState } from "react";
import Quiz from "../components/Quiz";
import QuizHistory from "../components/QuizHistory";
import { toast,Toaster } from "react-hot-toast";
function App() {
  const [username, setUsername] = useState("");
  const [startQuiz, setStartQuiz] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleStart = () => {
    if (username.trim()) {
      setStartQuiz(true);
      toast("Quiz Started");
    } else {
      toast("Please enter a valid username.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-6">
      {!startQuiz ? (
        <div className="bg-white p-8 rounded-xl shadow-lg text-center w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Enter Your Username</h2>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none mb-4"
          />
          <button
            onClick={handleStart}
            className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <Quiz username={username} setShowHistory={setShowHistory}/>
          {showHistory ? (
            <QuizHistory username={username} setShowHistory={setShowHistory}/>
          ) : (
            <button
              className="mt-5 w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
              onClick={() => setShowHistory(true)}
            >
              Show History
            </button>
          )}
        </div>
      )}
      <Toaster/>
    </div>
  );
}

export default App;