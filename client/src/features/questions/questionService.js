import axios from 'axios';

const API_URL = '/api/v1/questions/';

// Get all questions
const getQuestions = async (query = '') => {
    const response = await axios.get(API_URL + (query ? '?' + query : ''));
    return response.data;
};

// Create new question
const createQuestion = async (questionData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, questionData, config);
    return response.data;
};

// Get single question
const getQuestion = async (questionId) => {
    const response = await axios.get(API_URL + questionId);
    return response.data;
};

// Vote on question
const voteQuestion = async (questionId, type, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + questionId + '/vote', { type }, config);
    return response.data;
}

// Add answer
const addAnswer = async (questionId, answerData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.post(API_URL + questionId + '/answers', answerData, config);
    return response.data;
}

const questionService = {
    getQuestions,
    createQuestion,
    getQuestion,
    voteQuestion,
    addAnswer
};

export default questionService;
