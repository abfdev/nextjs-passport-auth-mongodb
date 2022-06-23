import { withSessionSsr } from "@lib/session";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Dashboard({ user }) {
  return (
    <div>
      <h1>name : {user.name}</h1>
      <p>email : {user.email}</p>
      <form method="POST" action="/api/logout">
        <button
          className="rounded-md border py-2 px-10 shadow-md"
          type="submit"
        >
          logOUt
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps = withSessionSsr(({ req }) => {
  const { passport, isAuth } = req.session;
  if (isAuth) {
    return {
      props: {
        user: passport.user,
      },
    };
  }
  return {
    redirect: {
      destination: "/",
    },
  };
});

export default Dashboard;
