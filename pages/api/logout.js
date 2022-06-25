import { withProtectedApiRoute } from "@lib/protectedRoute";

const handler = async (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
export const config = {
  api: {
    externalResolver: true,
  },
};
export default withProtectedApiRoute("/", handler);
