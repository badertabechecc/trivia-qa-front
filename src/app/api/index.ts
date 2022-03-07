import axios, { AxiosResponse } from 'axios';

import { IQuestions, IUser } from './types';

export const API = axios.create({ baseURL: process.env.BASE_URL });

interface IRegisterUser {
  email: string;
  name: string;
  lastName: string;
  phone: string;
}

interface ICheckAnswer {
  body: {
    userId: string;
    answerId: string;
    questionId: string;
  };
  token: string;
}

export const registerUser = async ({ email, name, lastName, phone }: IRegisterUser) => {
  const res = await API.post('/auth/local/register', {
    email,
    name,
    lastName,
    phone,
    username: name + lastName + phone,
  });
  return res.data;
};

export const checkAnswer = async ({ body, token }: ICheckAnswer) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res = await API.post(`/answers`, body, config);
  return res.data;
};

export const getUser = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const res: AxiosResponse<IUser> = await API.get('/users/me', config);
  return res.data;
};

export const fetchQuiz = async (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const res: AxiosResponse<IQuestions> = await API.get('/questions', config);
  return res.data;
};
