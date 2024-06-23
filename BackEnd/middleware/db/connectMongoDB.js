
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MongoURL)
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongoDB