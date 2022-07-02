import googleStrategy from "@lib/passport/googleStrategy";
import withPassport, { passport } from "@lib/withPassport";

const handler = (req, res) => {
	passport.authenticate("google", {
		scope: ["profile", "email"],
	})(req, res);
};
export const config = {
	api: {
		externalResolver: true,
	},
};
export default await withPassport(googleStrategy, handler);
