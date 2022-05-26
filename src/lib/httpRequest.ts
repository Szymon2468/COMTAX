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
        response = await axios.get(`/api/${url}`);
        return response.data;
      case 'POST':
        response = await axios.post(`/api/${url}`, data);
        return response.data;
      case 'PUT':
        response = await axios.put(`/api/${url}`, data);
        return response.data;
      case 'DELETE':
        response = await axios.delete(`/api/${url}`);
        return response.data;
      default:
        return null;
    }
  } catch (e) {
    console.error(e);
    return { serverError: true };
  }
};
