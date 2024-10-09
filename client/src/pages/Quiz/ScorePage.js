import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/ScorePage.css';
import Header from '../../components/Layout/Header';

const ScorePage = () => {
    const { state } = useLocation();
    const { score, correctAnswers } = state || { score: 0, correctAnswers: [] };
    const navigate=useNavigate();
    const handleRestart = () => {
        navigate('/quiz/maths'); 
    };

    return (
        <>
        <Header/>
        <div className="scorepage-container">
            <h2 className="scorepage-title">Your Score: <span>{score}</span></h2>
            <h3 className="scorepage-subtitle">Correct Answers:</h3>
            <ul className="scorepage-answers-list">
                {correctAnswers.map((answer, index) => (
                    <li key={index} className="scorepage-answer-item">
                        <span className="scorepage-question">{`Q${index + 1}) ${answer.question}`}</span>
                        <div className="scorepage-answer-details">
                            <span className="scorepage-answer">Answer: {answer.answer}</span>
                            <span className={`scorepage-correct ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                                {answer.isCorrect ? "✔️ Correct" : "❌ Incorrect"}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="scorepage-restart-button"
            onClick={handleRestart}
            >Restart Quiz</button>
            <button className="leader-restart-button"
            onClick={()=>navigate('/leaderboard')}
            >Leader</button>
        </div>
        </>
    );
};

export default ScorePage;
