import localStrategy from "@lib/passport/localStrategy";
import withPassport, {passport} from "@lib/withPassport";

const handler = (req, res) => {
	passport.authenticate("local")(req, res, () => {
		req.session.isAuth = true;
		res.json("success");
	});
};

export const config = {
	api: {
		externalResolver: true,
	},
};
export default await withPassport(localStrategy, handler);
