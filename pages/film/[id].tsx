import { allSettled, fork, serialize } from 'effector';
import type { GetServerSideProps } from 'next';
import { movieModel } from 'pages/movie';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const scope = fork();

  await allSettled(movieModel.pageStarted, {
    scope,
    params: { movieId: params?.id },
  });

  const values = serialize(scope);

  return {
    props: {
      values,
    },
  };
};

export { MoviePage as default } from 'pages/movie';
