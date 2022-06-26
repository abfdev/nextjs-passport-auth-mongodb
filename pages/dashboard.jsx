import { withSessionSsr } from "@lib/session";
import Image from "next/image";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Dashboard({ user }) {
  return (
    <div>
      <h1>name : {user.displayName}</h1>
      <p>email : {user.email}</p>
      <div className="relative h-20 w-20 overflow-hidden rounded-full">
        <Image
          src={
            user.avatar ||
            `https://ui-avatars.com/api/?background=random&name=${user.displayName}&font-size=0.5&size=130`
          }
          alt={user.displayName}
          layout="fill"
        />
      </div>
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
