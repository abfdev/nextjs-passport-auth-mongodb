import session from "express-session";
import MongoStore from "connect-mongo";
const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
const store = MongoStore.create({
  mongoUrl: process.env.DATABASE_URL,
  collectionName: "mySession",
});

const sessionOptions = {
  store,
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expiryDate,
  },
};
export const withSessionApi = (fn) => async (req, res) => {
  return await session(sessionOptions)(req, res, () => fn(req, res));
};
export const withSessionSsr = (fn) => async (ctx) => {
  await session(sessionOptions)(ctx.req, {}, () => ctx);
  return fn(ctx);
};
