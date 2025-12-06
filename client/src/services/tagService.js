import axios from 'axios';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1') + '/tags/';

// Get all tags
const getTags = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const tagService = {
    getTags,
};

export default tagService;
