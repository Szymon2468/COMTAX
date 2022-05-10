import { HTTPRequest } from './httpRequest';

export interface IUser {
  _id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}

export const authorize = async () => {
  const response = await HTTPRequest('GET', 'auth/getMe');
  if (response.success) {
    return response.user;
  } else {
    window.location.href = '/admin-panel/autoryzacja/logowanie';
  }
};
