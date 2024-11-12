// frontend/src/services/api.js

const API_BASE_URL = 'http://localhost:5003/api';
const FILE_BASE_URL = 'http://localhost:5003/files';

export const fetchFiles = async (entityId) => {
    const response = await fetch(`${API_BASE_URL}/files/${entityId}`);
    if (!response.ok) throw new Error('Failed to fetch files');
    return response.json();
};

export const getFileUrl = (entityId, category, filename) => {
    return `${FILE_BASE_URL}/${entityId}/${category}/${filename}`;
};
