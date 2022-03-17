import express from "express";
import { protect, restrictTo } from "../middlewares/auth.js";
import { getAllMessages, getMessage, deleteMessage, createMessage } from "./../controllers/messageController.js"

const router = express.Router()


router.route("/").get(protect, restrictTo('admin'), getAllMessages).post(createMessage)

router.route("/:id").get(getMessage).delete(protect, restrictTo('admin'), deleteMessage)

export default router