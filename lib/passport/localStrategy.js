import bcrypt from "bcryptjs";
import { Strategy as LocalStrategy } from "passport-local";
import db from "@lib/prisma";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    const user = await db.user.findUnique({ where: { email } });
    if (!user)
      return done(null, false, {
        message: "Incorrect username or password.",
      });
    await bcrypt.compare(password, user.password, function (err, res) {
      if (err) {
        return done(err);
      }
      if (!res) {
        return done(null, false, {
          message: "Incorrect username or password.",
        });
      }
      return done(null, user);
    });
  }
);
export default localStrategy;
