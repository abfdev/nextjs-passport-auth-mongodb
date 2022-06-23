import MongoStore from "connect-mongo";
import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";

const sessionOptions = {
  store: promisifyStore(
    MongoStore.create({
      mongoUrl: process.env.DATABASE_URL,
      collectionName: "session",
    })
  ),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: process.env.NODE_ENV === "production",
  },
  name: "session",
  secret: process.env.SESSION_SECRET,
};

export const withSessionApi = (handler) => async (req, res) => {
  await nextSession(sessionOptions)(req, res);
  return handler(req, res);
};
export const withSessionSsr = (fn) => async (ctx) => {
  await nextSession(sessionOptions)(ctx.req, ctx.res);
  return fn(ctx);
};
