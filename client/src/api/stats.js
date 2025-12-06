import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1/analytics';

export const trackVisit = async (page) => {
    try {
        await axios.post(`${API_URL}/track`, { page });
    } catch (error) {
        console.error('Error tracking visit:', error);
    }
};

export const getStats = async () => {
    try {
        const response = await axios.get(`${API_URL}/stats`);
        return response.data;
    } catch (error) {
        console.error('Error fetching stats:', error);
        throw error;
    }
};
