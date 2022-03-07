import { NextPageContext } from 'next';
import nookies from 'nookies';

import { fetchQuiz, getUser } from 'app/api';
import { IQuestions, IUser } from 'app/api/types';
import QuizPage from 'app/pages/quiz';

interface IProps {
  data: IQuestions;
  token: string;
  user: IUser;
}

const Quiz = (props: IProps) => {
  const user = {
    token: props.token,
    id: props.user.id,
    numQuestion: props.user.numQuestion,
    score: props.user.score,
    questionsAsked: props.user.questionsAsked,
  };
  return <QuizPage data={props.data} token={props.token} user={user} />;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = nookies.get(ctx);
  const token = cookies['trivia-qa-token'];

  if (!token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  const data = await fetchQuiz(token);
  const user = await getUser(token);

  return { props: { data, token, user } };
}

export default Quiz;
