import axios from 'axios';

// let API_URL = 'https://comtax.netlify.app/api';

export const HTTPRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: object
) => {
  let response;
  const API_URL = process.env.API_URL;
  try {
    axios.defaults.withCredentials = true;

    switch (method) {
      case 'GET':
        response = await axios.get(`${API_URL}/${url}`);
        return response.data;
      case 'POST':
        response = await axios.post(`${API_URL}/${url}`, data);
        return response.data;
      case 'PUT':
        response = await axios.put(`${API_URL}/${url}`, data);
        return response.data;
      case 'DELETE':
        response = await axios.delete(`${API_URL}/${url}`);
        return response.data;
      default:
        return null;
    }
  } catch (e) {
    return { serverError: true };
  }
};
