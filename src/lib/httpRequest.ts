import axios from 'axios';

export const HTTPRequest = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  data?: object
) => {
  let response;
  switch (method) {
    case 'GET':
      response = await axios.get(`${process.env.API_URL}/${url}`);
      return response.data;
    case 'POST':
      response = await axios.post(`${process.env.API_URL}/${url}`, data);
      return response.data;
    case 'PUT':
      response = await axios.put(`${process.env.API_URL}/${url}`, data);
      return response.data;
    case 'DELETE':
      response = await axios.delete(`${process.env.API_URL}/${url}`);
      return response.data;
    default:
      return null;
  }
};
