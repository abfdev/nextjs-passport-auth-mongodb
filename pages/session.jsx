import { withProtectedRoute } from "@lib/protectedRoute";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Session({ view }) {
  return <div>view {view}</div>;
}

export const getServerSideProps = await withProtectedRoute("/", ({ req }) => {
  return { props: { data: null } };
});

export default Session;
