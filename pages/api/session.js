import { withSessionApi } from "@lib/session";

const handler = async (req, res) => {
  req.session.view = 1;
  res.json({
    view: req.session,
  });
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withSessionApi(handler);
