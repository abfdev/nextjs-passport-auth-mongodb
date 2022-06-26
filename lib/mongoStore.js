import { session } from "next-session";
import MongoDBStore from "connect-mongodb-session";
let mongoStore;
if (!global.mongoStore) {
  global.mongoStore = MongoDBStore(session)({
    uri: process.env.MONGODB_URI,
    collection: "session",
  });
}
mongoStore = global.mongoStore;

export default mongoStore;
