import '../../styles/QuizPage.css'; // Import custom styles
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import {API_URL} from '../../constant';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/Auth';
import Header from '../../components/Layout/Header';

const QuizPage = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [auth] = useAuth();
    const userId = auth?.user?._id;
    const navigate = useNavigate();
    const { topicName } = useParams();
    const [topicIds, setTopicIds] = useState([]);
    const location = useLocation();
    
    useEffect(() => {
        const ids = location.state?.topicsIds || [];
        if (ids.length > 0) {
            setTopicIds(ids); // Set the state with the topic IDs
            fetchQuestions(ids); // Pass the IDs to fetchQuestions
        } else {
            toast.warn("No topics selected.");
        }
    }, [location.state]);

        const fetchQuestions = async (ids) => {
            try {
                const payload={
                    topicName,
                    topicIds:ids
                }
                const response = await axios.post(`${API_URL}/api/questions/selected-question/${topicName}?page=1`,payload);
                const resp = response.data;

                if (resp?.code === 200) {
                    setQuestions(resp.data.slice(0, -1));
                } else {
                    toast.error(resp.message);
                }
            } catch (error) {
                console.error(error);
                toast.error("Failed to fetch questions.");
            }
        };

        
    const handleAnswerSelect = (answer) => {
        const questionId = questions[currentQuestionIndex]._id;
        const existingAnswerIndex = userAnswers.findIndex(ans => ans.questionId === questionId);

        if (existingAnswerIndex > -1) {
            const updatedAnswers = [...userAnswers];
            updatedAnswers[existingAnswerIndex].answer = answer;
            setUserAnswers(updatedAnswers);
        } else {
            setUserAnswers([...userAnswers, { questionId, answer }]);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleSubmit = async () => {
        const payload = {
            userId:auth?.user?._id,
            answers: userAnswers,
        };

        try {
            const response = await axios.post(`${API_URL}/api/questions/submit-quiz`, payload);
            const resp = response.data;
            if (resp?.code === 200) {
                navigate('/score', { state: { score: resp.data[0].score, correctAnswers: resp.data[0].validatedAnswers } });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    if (questions.length === 0) return <div className="quizpage-loading">Loading...</div>;

    const question = questions[currentQuestionIndex];

    return (
        <>
            <Header />
            <div className="quizpage-container">
    <div className="quizpage-question-info">
        <h2 className="quizpage-question-title">Q{currentQuestionIndex + 1}.) {question.question}</h2>
        <p className="quizpage-options-prompt">Select Options:</p>
    </div>
    <div className="quizpage-options-container">
        {question.options.map((option) => (
            <Button 
                key={option} 
                label={option} 
                className="quizpage-option-button"
                onClick={() => handleAnswerSelect(option)} 
            />
        ))}
    </div>
    <div className="quizpage-navigation-buttons">
        <Button label="Back" onClick={handleBack} disabled={currentQuestionIndex === 0} />
        <Button label="Next" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1} />
        {currentQuestionIndex === questions.length - 1 && (
            <Button label="Submit" onClick={handleSubmit} className="quizpage-submit-button" />
        )}
    </div>
    <div className="quizpage-question-number">
        Question {currentQuestionIndex + 1} of {questions.length}
    </div>
</div>        </>
    );
};

export default QuizPage;
