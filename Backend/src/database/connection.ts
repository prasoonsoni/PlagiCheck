import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/plagicheck"

const connectToMongoDB = () => {
    try {
        mongoose.connect(MONGO_URI)
        console.log("Connected to Mongoose.")
    } catch (err) {
        console.log("Could not connect: " + err)
    }
    const dbConnection = mongoose.connection

    dbConnection.on("error", (err: Error) => {
        console.log(`Connection Error: ${err}`)
    })

    dbConnection.once("open", () => {
        console.log("Connected to DB!");
    })
}

export default connectToMongoDB