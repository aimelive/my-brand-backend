import express from "express";
import userRouter from "./src/routes/userRoutes.js"
import messageRouter from "./src/routes/messageRoutes.js"
import blogRouter from "./src/routes/blogRoutes.js"
import commentRouter from "./src/routes/commentRoutes.js"
import subscriptionRouter from "./src/Subscriptions/subscription.routes.js"
import addBlogWithPhotoRouter from "./src/middlewares/About Photo/add.blog.route.js"
import cors from "cors"


const app = express();

app.use(express.json());

app.use(cors())

app.use("/api/v1/users", userRouter)
app.use("/api/v1/blogs", blogRouter)
app.use("/api/v1/addBlog", addBlogWithPhotoRouter)
app.use("/api/v1/messages", messageRouter)
app.use("/api/v1/blogs", commentRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)


app.get("/", (req, res) => {
    res.status(200).json({
        Message: "Welcome to Aimelive's APIs - MY BRAND"
    })
});
app.get("*", (req, res) => {
    res.status(404).json({
        Message: "No Path Found!"
    });
});




export { app as default }