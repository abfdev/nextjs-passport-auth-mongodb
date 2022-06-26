import { withProtectedApiRoute } from "@lib/protectedRoute";

const handler = async (req, res) => {
  const posts = await db.post.findMany({
    where: {
      OR: [
        {
          userId: req.session.passport.user.id,
        },
        {
          authId: req.session.passport.user.id,
        },
      ],
    },
  });
  res.json(posts);
};

export default withProtectedApiRoute("/", handler);
