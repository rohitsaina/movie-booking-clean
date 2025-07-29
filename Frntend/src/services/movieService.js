import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

class MovieService {
  async getAllMovies() {
    try {
      const response = await axios.get(`${API_URL}/movies`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch movies' };
    }
  }

  async getMovieById(id) {
    try {
      const response = await axios.get(`${API_URL}/movies/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch movie details' };
    }
  }

  async getCinemasByMovie(movieId, location) {
    try {
      const response = await axios.get(`${API_URL}/cinemas/movie/${movieId}?location=${location}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch cinemas' };
    }
  }

  async submitFeedback(feedbackData) {
    try {
      const response = await axios.post(`${API_URL}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit feedback' };
    }
  }
}

export default new MovieService();