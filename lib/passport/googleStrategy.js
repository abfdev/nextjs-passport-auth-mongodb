import db from "@lib/prisma";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const callbackURL =
  process.env.NODE_ENV === "production"
    ? process.env.GOOGLE_CALLBACK_URL_PRODUCTION
    : process.env.GOOGLE_CALLBACK_URL_DEVELOPMENT;
const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    const user = await db.auth.upsert({
      where: {
        clientId: profile.id,
      },
      update: {},
      create: {
        clientId: profile.id,
        displayName: profile.displayName,
        email: profile.emails[0].value,
        avatar: profile.photos[0].value,
      },
    });
    return done(null, user);
  }
);

export default googleStrategy;
