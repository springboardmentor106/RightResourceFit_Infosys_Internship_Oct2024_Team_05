const handleLogin = async (credentials) => {
  try {
    const response = await axios.post('/api/login', credentials);
    const { token, userId } = response.data;
    
    // Store both token and userId
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    
    return response.data;
  } catch (error) {
    throw error;
  }
}; 