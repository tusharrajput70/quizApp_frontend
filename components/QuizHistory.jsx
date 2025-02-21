import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const QuizHistory = ({ username ,setShowHistory}) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch(`https://quizapp-backend-qnzt.onrender.com/api/quiz-history?username=${username}`);
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                setHistory(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [username]);

    if (loading)
        return <p className="text-center text-xl font-semibold mt-10 animate-pulse">Fetching history...</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">📜 Quiz History</h2>
            {history.length === 0 ? (
                <p className="text-center text-lg text-gray-600">No quiz attempts found.</p>
            ) : (
                <ul className="space-y-4">
                    {history.map((attempt, index) => (
                        <li
                            key={index}
                            className="p-4 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <p className="text-lg font-semibold text-gray-700">Attempt {index + 1}</p>
                            <p className="text-gray-600">Score: {attempt.score} / {attempt.totalquestions}</p>
                        </li>
                    ))}
                </ul>
            )}
            <button
                className="mt-5 w-full bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition"
                onClick={()=>{setShowHistory(false)}}
            >
                ❌ close History
            </button>
        </div>
    );
};

export default QuizHistory;