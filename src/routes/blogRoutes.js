import express from "express";
import { getAllBlogs, getBlog, createBlog, updateBlog, deleteBlog } from "./../controllers/blogController.js"
import { protect, restrictTo } from "../middlewares/auth.js";

const router = express.Router()


router.route("/").get(getAllBlogs)
router.post("/", protect, restrictTo('admin'), createBlog)

router.route("/:id").get(getBlog).patch(protect, restrictTo('admin'), updateBlog).delete(protect, restrictTo('admin'), deleteBlog)

export default router