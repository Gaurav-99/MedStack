import axios from 'axios';

const API_URL = '/api/v1/tags/';

// Get all tags
const getTags = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const tagService = {
    getTags,
};

export default tagService;
