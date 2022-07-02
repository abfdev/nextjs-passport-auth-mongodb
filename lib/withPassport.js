import passport from "passport";
import { withSessionApi } from "./session";

passport.serializeUser(function (user, done) {
	delete user.password;
	done(null, user);
});

passport.deserializeUser(async function (user, cb) {
	return cb(null, user);
});
const withPassport = async (strategy, fn) => {
	passport.use(strategy);
	return await withSessionApi((req, res) =>
		passport.initialize()(req, res, () => passport.session()(req, res, () => fn(req, res)))
	);
};

export { passport };
export default withPassport;
