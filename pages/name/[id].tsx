import { allSettled, fork, serialize } from 'effector';
import type { GetServerSideProps } from 'next';
import { personModel } from 'pages/person';
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

  await allSettled(personModel.pageStarted, {
    scope,
    params: { personId: params?.id },
  });

  const values = serialize(scope);

  return {
    props: {
      values,
    },
  };
};

export { PersonPage as default } from 'pages/person';
