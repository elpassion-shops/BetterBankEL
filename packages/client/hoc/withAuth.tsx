import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export default function withAuth(
  destination: string
): (gssp?: GetServerSideProps) => GetServerSideProps {
  return (
    gssp = async (context: GetServerSidePropsContext) => {
      return {
        props: {},
      };
    }
  ) => {
    return async (context) => {
      const session = await getSession({ req: context.req });
      if (!session) {
        return {
          redirect: {
            destination,
            permanent: false,
          },
        };
      }
      return gssp(context);
    };
  };
}
