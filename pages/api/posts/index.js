import { withProtectedApiRoute } from "@lib/protectedRoute";

const handler = async (req, res) => {
  const posts = await db.post.findMany({
    where: {
      userId: req.session.passport.user.id,
    },
  });
  res.json(posts);
};

export default withProtectedApiRoute("/", handler);
