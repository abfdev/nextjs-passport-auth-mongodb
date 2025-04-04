import googleStrategy from "@lib/passport/googleStrategy";
import withPassport, { passport } from "@lib/withPassport";

const handler = (req, res) => {
	passport.authenticate("google")(req, res, () => {
		req.session.isAuth = true;
		res.redirect("/dashboard");
	});
};

export const config = {
	api: {
		externalResolver: true,
	},
};
export default await withPassport(googleStrategy, handler);
