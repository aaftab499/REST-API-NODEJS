import mongoose from "mongoose";
import config from "config";

const connect = async () => {
	const MONGO_URI = config.get<string>("dbUri");

	try {
		await mongoose.connect(MONGO_URI);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		process.exit(1);
	}
};

export default connect;