export const API_CONFIG = {
    // Base URL for the FastAPI server
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
    // Default request headers
    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    // Default pagination parameters
    DEFAULT_LIMIT: 18,
};