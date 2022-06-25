import localStrategy from "@lib/passport/localStrategy";
import withPassport, { passport } from "@lib/withPassport";

const handler = async (req, res) => {
  await passport.authenticate("local")(req, res, () => {
    req.session.isAuth = true;
    res.json(req.session);
  });
};

export const config = {
  api: {
    externalResolver: true,
  },
};
export default await withPassport(localStrategy, handler);
