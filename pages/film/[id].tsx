import { allSettled, fork, serialize } from 'effector';
import type { GetServerSideProps } from 'next';
import { movieModel } from 'pages/movie';
import { paths } from 'shared/routing';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const scope = fork();

  if (!params?.id) {
    return {
      redirect: {
        destination: paths.home,
        permanent: false,
      },
    };
  }

  await allSettled(movieModel.pageStarted, {
    scope,
    params: { movieId: params.id },
  });

  const values = serialize(scope);

  return {
    props: {
      values,
    },
  };
};

export { MoviePage as default } from 'pages/movie';
