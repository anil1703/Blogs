import express from "express"
import mongoose from "mongoose"
import { routes } from "./router.js";

const app = express();
app.use(express.json())

const mongooseUrl = "mongodb+srv://anilcherry1714:Mongo123@cluster0.juxytxs.mongodb.net/Blog_website"
mongoose.connect(mongooseUrl)

app.use(routes)

const database = mongoose.connection;

database.on("error", () => {
    console.log("Error connecting to database")
})

database.once("connected", () => {
    console.log("Connected to database")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})