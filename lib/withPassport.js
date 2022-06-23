import passport from "passport";
import localStrategy from "@lib/passport/local";

passport.use(localStrategy);

passport.serializeUser(function (user, done) {
  delete user.password;
  done(null, user);
});

passport.deserializeUser(async function (user, cb) {
  return cb(null, user);
});
const withPassport = (fn) => async (req, res) =>
  passport.initialize()(req, res, async () =>
    passport.session()(req, res, () => fn(req, res))
  );

export { passport };
export default withPassport;
