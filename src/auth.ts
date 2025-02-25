import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const auth = {
  async login(email: string, password: string) {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    }
    return null;
  },

  async register(email: string, password: string) {
    const response = await axios.post(`${API_URL}/register`, { email, password });
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      return response.data;
    }
    return null;
  },

  logout() {
    localStorage.removeItem('token');
  },

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(atob(token.split('.')[1]));
      return user;
    }
    return null;
  }
}