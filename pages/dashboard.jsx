import { withSessionSsr } from "@lib/session";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Dashboard({ user }) {
  return (
    <div>
      <h1>name : {user.name}</h1>
      <p>email : {user.email}</p>
      <img
        src={
          user.avatar ||
          `https://ui-avatars.com/api/?background=random&name=${user.name}&font-size=0.5&size=130`
        }
        className="h-12 w-12 rounded-full"
      />
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
