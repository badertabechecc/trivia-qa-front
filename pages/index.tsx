import type { NextPage, NextPageContext } from 'next';
import nookies from 'nookies';

import Register from 'app/pages/register';

const Home: NextPage = () => {
  return <Register />;
};

export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = nookies.get(ctx);
  const data = cookies['trivia-qa-token'];
  if (data) {
    return {
      redirect: {
        destination: '/quiz',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;
