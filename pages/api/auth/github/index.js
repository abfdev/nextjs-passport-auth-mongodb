import gitHubStrategy from "@lib/passport/githubStrategy";
import withPassport, { passport } from "@lib/withPassport";

const handler = async (req, res) => {
  await passport.authenticate("github", {
    scope: ["user:email"],
  })(req, res);
};

export default await withPassport(gitHubStrategy, handler);
