import db from "@lib/prisma";
import {withProtectedApiRoute} from "@lib/protectedRoute";

const handler = async (req, res) => {
	try {
		const newUser = await db.user.create({
			data: {
				displayName: "John Doe",
				email: "abfaycal@gmail.com",
				password: "password",
			},
		});
		console.log(newUser);
		res.json(newUser);
	} catch (err) {
		console.log(err);
		res.json(err.meta.target);
	}
};

export default withProtectedApiRoute("/", handler);
