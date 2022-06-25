import { withProtectedApiRoute } from "@lib/protectedRoute";

const handler = async (req, res) => {
  res.json({
    view: req.session,
  });
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withProtectedApiRoute("/", handler);
