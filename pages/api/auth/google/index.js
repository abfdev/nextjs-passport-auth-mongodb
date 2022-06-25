import { passport } from "@lib/withPassport";

const handler = async (req, res) => {
  await passport.authenticate("google", {
    scope: ["email", "profile"],
  })(req, res);
};

export default handler;
