import MongoStore from "connect-mongo";

let mongoStore;
if (!global.mongoStore) {
	global.mongoStore = new MongoStore({
		mongoUrl: process.env.DATABASE_URL,
		collectionName: "Session",
	});
}
mongoStore = global.mongoStore;

export default mongoStore;
