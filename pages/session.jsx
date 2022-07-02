import { withProtectedRoute } from "@lib/protectedRoute";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Session() {
	return <div>view</div>;
}

export default Session;
export const getServerSideProps = withProtectedRoute("/");
