import {withProtectedRoute} from "@lib/protectedRoute";
import Image from "next/image";

/** @param {import('next').InferGetServerSidePropsType<typeof getServerSideProps> } props */
function Dashboard({user}) {
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
			<form method="POST" action="/api/auth/logout">
				<button className="rounded-md border py-2 px-10 shadow-md" type="submit">
					logOUt
				</button>
			</form>
		</div>
	);
}

export default Dashboard;

export const getServerSideProps = withProtectedRoute("/", ({req}) => {
	const {passport} = req.session;
	return {
		props: {
			user: passport.user,
		},
	};
});
