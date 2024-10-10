import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import {API_URL} from '../../constant';
import { toast } from 'react-toastify';
import '../../styles/QuizSelection.css'; 
import Header from '../../components/Layout/Header';

const QuizSelection = () => {
    const [topics, setTopics] = useState([]);
    const [selectedTopics, setSelectedTopics] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllTopics();
    }, []);

    const fetchAllTopics = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/admin/all-topics`);
            const resp = response.data;
            if (resp?.code === 200) {
                setTopics(resp.data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to fetch topics');
        }
    };

    const handleStartQuiz = () => {
        if (selectedTopics.length > 0) {
            const selectedTopic = topics.find(t => t._id === selectedTopics[0]);
            if (selectedTopic) {
                navigate(`/quiz/topic/${selectedTopic.topic}/id/${selectedTopic._id}`,{ state: { topicsIds: selectedTopics } });
            }
        } else {
            toast.warn('Please select at least one topic.');
        }
    };

    return (
        <>
        <Header/>
        <div className="quiz-selection-container">
            <h2 className="title">Select Topics for Quiz</h2>
            <MultiSelect
                value={selectedTopics}
                options={topics.map((option) => ({ label: option.topic, value: option._id }))}
                onChange={(e) => setSelectedTopics(e.value)}
                placeholder="Choose topics"
                className="multi-select"
            />
            <Button
                label="Start Quiz"
                onClick={handleStartQuiz}
                disabled={selectedTopics.length === 0}
                className="start-quiz-button"
            />
        </div>
        </>
    );
};

export default QuizSelection;
