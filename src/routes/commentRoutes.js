import express from "express";
import { createComment, deleteComment, getAllComments, getComment } from "./../controllers/commentController.js"
import { protect, restrictTo } from "../middlewares/auth.js";

const router = express.Router()

router.route("/:blogId/comment/").post(createComment)

router.route("/:blogId/comments/").get(getAllComments)

router.route("/:blogId/:commentId").get(getComment).delete(protect, restrictTo('admin'), deleteComment)



export default router