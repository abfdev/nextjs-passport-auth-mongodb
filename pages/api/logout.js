import { withSessionApi } from "@lib/session";

const handler = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withSessionApi(handler);
