import gitHubStrategy from "@lib/passport/githubStrategy";
import withPassport, { passport } from "@lib/withPassport";

const handler = async (req, res) => {
	passport.authenticate("github", {
		scope: ["user:email"],
	})(req, res);
};
export const config = {
	api: {
		externalResolver: true,
	},
};

export default await withPassport(gitHubStrategy, handler);
