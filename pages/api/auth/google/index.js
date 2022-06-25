import googleStrategy from "@lib/passport/googleStrategy";
import withPassport, { passport } from "@lib/withPassport";

const handler = async (req, res) => {
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res);
};

export default await withPassport(googleStrategy, handler);
