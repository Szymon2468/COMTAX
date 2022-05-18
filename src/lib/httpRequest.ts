import axios from 'axios';
import config from '../../ENV_CONFIG.json';

const API_URL = config.API_URL;

if (!API_URL) {
  throw new Error(
    'Please define the API_URL environment variable inside ENV_CONFIG.json'
  );
}

export const HTTPRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: object
) => {
  let response;
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
