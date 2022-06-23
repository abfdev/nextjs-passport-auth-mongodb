import { withSessionApi } from "../../lib/session";

const handler = async (req, res) => {
  delete req.session.passport;
  res.redirect("/");
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withSessionApi(handler);
