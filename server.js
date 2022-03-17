import mongoose from "mongoose";
import app from "./index.js"
import dotenv from "dotenv"



dotenv.config({
    path: "./config.env"
})

const DB_URL = process.env.DATABASE.replace("<password>", process.env.PASSWORD)

const PORT = process.env.PORT || 3000

mongoose.connect(DB_URL).then(() => console.log("Connected to the DB 🌎"))


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT} ... 🔥🔥`);
})