import Link from "next/link";
import { withSessionSsr } from "../lib/session";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Dashboard({ user }) {
  return (
    <div>
      <h1>name : {user.name}</h1>
      <p>email : {user.email}</p>
      <Link href="/api/logout">logout</Link>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(({ req }) => {
  const { passport } = req.session;
  return {
    props: {
      user: passport?.user,
    },
  };
});

export default Dashboard;
