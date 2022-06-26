import db from "@lib/prisma";
import { Strategy as GitHubStrategy } from "passport-github2";

const gitHubStrategy = new GitHubStrategy(
  {
    clientID:
      process.env.NODE_ENV == "production"
        ? process.env.GITHUB_CLIENT_ID_PRODUCTION
        : process.env.GITHUB_CLIENT_ID,
    clientSecret:
      process.env.NODE_ENV == "production"
        ? process.env.GITHUB_CLIENT_SECRET_PRODUCTION
        : process.env.GITHUB_CLIENT_SECRET,
    callbackURL:
      process.env.NODE_ENV === "production"
        ? process.env.GITHUB_CALLBACK_URL_PRODUCTION
        : process.env.GITHUB_CALLBACK_URL_DEVELOPMENT,
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    const user = await db.auth.upsert({
      where: {
        clientId: profile.id,
      },
      update: {},
      create: {
        clientId: profile.id,
        displayName: profile.displayName || profile.username,
        email: profile._json.email,
        avatar: profile.photos[0].value,
      },
    });
    return done(null, user);
  }
);

export default gitHubStrategy;
