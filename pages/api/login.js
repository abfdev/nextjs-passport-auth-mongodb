import session, { withSessionApi } from "../../lib/session";
import withPassport, { passport } from "../../lib/withPassport";

const handler = async (req, res) => {
  await passport.authenticate("local")(req, res, () => {
    req.session.flash = {
      type: "success",
      message: "You have been logged in",
    };
    res.json(req.session);
  });
};

export const config = {
  api: {
    externalResolver: true,
  },
};

export default withPassport(withSessionApi(handler));
