// src/api/ApiService.jsx
class ApiService {
    constructor(baseUrl = process.env.REACT_APP_API_BASE_URL || 'https://api.example.com') {
      this.baseUrl = baseUrl;
    }
  
    async request(endpoint, { method = 'GET', body = null, headers = {}, responseType = 'json' } = {}) {
      const config = {
        method,
        headers: {
          ...headers,
        },
      };
  
      if (body && !(body instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
        config.body = JSON.stringify(body);
      } else if (body instanceof FormData) {
        config.body = body;
      }
  
      // Add auth token if available
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
  
      try {
        const response = await fetch(`${this.baseUrl}${endpoint}`, config);
  
        if (!response.ok) {
          // Try to extract JSON error
          let errorMessage = `HTTP ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch {
            // Fallback if not JSON
            const text = await response.text();
            errorMessage = text || errorMessage;
          }
  
          throw new Error(errorMessage);
        }
  
        // Return based on response type
        switch (responseType.toLowerCase()) {
          case 'text':
            return await response.text();
          case 'blob':
            return await response.blob();
          case 'json':
          default:
            return await response.json();
        }
      } catch (error) {
        console.error(`[API ${method}] ${endpoint} failed:`, error);
        throw error;
      }
    }
  
    get(endpoint, options = {}) {
      return this.request(endpoint, { ...options, method: 'GET' });
    }
  
    post(endpoint, body, options = {}) {
      return this.request(endpoint, { ...options, method: 'POST', body });
    }
  
    put(endpoint, body, options = {}) {
      return this.request(endpoint, { ...options, method: 'PUT', body });
    }
  
    delete(endpoint, options = {}) {
      return this.request(endpoint, { ...options, method: 'DELETE' });
    }
  }
  
  const apiService = new ApiService();
  export default apiService;
  