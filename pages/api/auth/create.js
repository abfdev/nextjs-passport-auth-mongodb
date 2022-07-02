import db from "@lib/prisma";
import {withSessionApi} from "@lib/session";
import bcrypt from "bcryptjs";

const handler = async (req, res) => {
	if (req.method !== "POST") return res.status(405).json({error: "Method not allowed"});
	const {email, password, name} = req.body;
	try {
		const user = await db.user.create({
			data: {
				email,
				password: await bcrypt.hash(password, 10),
				displayName: name,
			},
		});
		req.session.passport = {
			user,
		};
		req.session.isAuth = true;
		res.json("success");
	} catch (e) {
		res.status(500).json({
			code: e.code,
		});
	}
};

export default withSessionApi(handler);
