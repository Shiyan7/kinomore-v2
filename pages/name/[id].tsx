import { allSettled, fork, serialize } from 'effector';
import type { GetServerSideProps } from 'next';
import { personModel } from 'pages/person';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const scope = fork();

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
