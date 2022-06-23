import { withSessionSsr } from "../lib/session";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Session({ view }) {
  return <div>view {view}</div>;
}

export const getServerSideProps = withSessionSsr(({ req }) => {
  console.log(req.session);
  return {
    props: {
      view: 1,
    },
  };
});

export default Session;
