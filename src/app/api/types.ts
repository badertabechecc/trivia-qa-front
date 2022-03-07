export interface IAnswer {
  _id: string;
  answer: string;
}

export type IAnswers = IAnswer[];

export interface IQuestion {
  _id: string;
  question: string;
  answers: IAnswers;
}

export type IQuestions = IQuestion[];

export interface IUser {
  confirmed: string;
  blocked: boolean;
  numQuestion: number;
  score: number;
  _id: string;
  email: string;
  name: string;
  phone: string;
  username: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  role: {
    _id: string;
    name: string;
    description: string;
    type: string;
    __v: number;
    id: string;
  };
  id: string;
  history: [];
  questionsAsked: string[] | undefined;
}
