import session from "express-session";
import MongoStore from "connect-mongo";
import nc from "next-connect";
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
//to get express-session middleware  next server side rendring
export const withSessionSsr = (fn) => async (req, res) => {
  return await session(sessionOptions)(req, res, () => fn(req, res));
};
