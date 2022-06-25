import db from "@lib/prisma";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const user = await db.googleUser.upsert({
      where: {
        googleId: profile.id,
      },
      update: {},
      create: {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      },
    });
    return done(null, user);
  }
);

export default googleStrategy;
