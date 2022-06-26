import gitHubStrategy from "@lib/passport/githubStrategy";
import withPassport, { passport } from "@lib/withPassport";

const handler = async (req, res) => {
  await passport.authenticate("github")(req, res, () => {
    req.session.isAuth = true;
    res.redirect("/dashboard");
  });
};

export default await withPassport(gitHubStrategy, handler);
