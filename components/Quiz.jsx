import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Quiz = ({ username,setShowHistory }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const res = await fetch("https://quizapp-backend-qnzt.onrender.com/api/questions");
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setQuestions(data);
            } catch (error) {
                toast.error(error.message);
            }
        };
        getQuestions();
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            handleNextQuestion();
        }
    }, [timeLeft]);

    const handleCorrectAnswer = () => {
        if (selectedAnswer === questions[currentQuestionIndex].correctanswer || userInput == questions[currentQuestionIndex].correctanswer) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            handleCorrectAnswer();
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setSelectedAnswerIndex(null);
            setUserInput("");
            setTimeLeft(30);
        } else {
            handleCorrectAnswer();
            setQuizFinished(true);
            toast('Submitted Successfully');
        }
    };

    useEffect(() => {
        if (quizFinished) saveQuizAttempt();
    }, [quizFinished]);

    const saveQuizAttempt = async () => {
        try {
            await fetch("https://quizapp-backend-qnzt.onrender.com/api/quiz-history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, score, totalquestions: questions.length })
            });
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (questions.length === 0)
        return <p className="text-center text-xl font-semibold mt-10 animate-pulse">Loading...</p>;

    if (quizFinished) {
        return (
            <div className="text-center mt-10 bg-white p-6 rounded-xl shadow-lg w-96 mx-auto">
                <p className="text-2xl font-bold text-green-600">🎉 Quiz Finished!</p>
                <p className="text-lg mt-2">
                    Your Score: <span className="font-semibold">{score}/{questions.length}</span>
                </p>
                <button
                    onClick={() => {
                        setCurrentQuestionIndex(0);
                        setScore(0);
                        setTimeLeft(30);
                        setQuizFinished(false);
                        setShowHistory(false);
                        
                    }}
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition mt-4"
                >
                    🔄 Retry Quiz
                </button>
            </div>
        );
    }
    
    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-700">{currentQuestion.question}</h2>
            {currentQuestion.type === "MCQ" ? (
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <label
                            key={index}
                            className={`block p-4 border border-gray-300 rounded-lg cursor-pointer transition duration-200 ${selectedAnswerIndex === index ? "bg-gray-400 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
                        >
                            <input
                                type="radio"
                                name="answer"
                                value={option}
                                checked={selectedAnswerIndex === index}
                                onChange={() => {
                                    setSelectedAnswer(String.fromCharCode(65 + index));
                                    setSelectedAnswerIndex(index);
                                }}
                                className="hidden"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            ) : (
                <div className="mb-6">
                    <input
                        type="number"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your answer"
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            )}
            <div className="flex items-center justify-between mt-6 p-4 bg-gray-100 rounded-lg">
                <div className="text-lg font-semibold flex items-center space-x-2">
                    <span>🏆</span>
                    <span>Score: {score}</span>
                </div>
                <div className={`text-lg font-bold ${timeLeft <= 10 ? "text-red-500" : "text-gray-700"} flex items-center space-x-2`}>
                    <span>⏳</span>
                    <span>Time Left: {timeLeft}s</span>
                </div>
                <button
                    onClick={handleNextQuestion}
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                >
                    Next ➡️
                </button>
            </div>
        </div>
    );
};

export default Quiz;