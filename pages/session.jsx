import { withSessionSsr } from "@lib/session";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Session({ view }) {
  return <div>view {view}</div>;
}

export const getServerSideProps = withSessionSsr(({ req }) => {
  req.session.view++;
  return {
    props: {
      view: req.session.view,
    },
  };
});

export default Session;
