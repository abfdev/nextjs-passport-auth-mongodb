import nextSession from "next-session";
import { promisifyStore } from "next-session/lib/compat";
import mongoStore from "@lib/mongoStore";

const sessionOptions = {
  store: promisifyStore(mongoStore),
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60,
    secure: true,
  },
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
};

export const withSessionApi = (handler) => async (req, res) => {
  await nextSession(sessionOptions)(req, res);
  return handler(req, res);
};
export const withSessionSsr = (fn) => async (ctx) => {
  await nextSession(sessionOptions)(ctx.req, {});
  return fn(ctx);
};
