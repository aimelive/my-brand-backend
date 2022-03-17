import express from "express";
import { addSubscription, getSubscription, getOneSubscription, updateSubscription, deleteSubscription } from "./subscription.controller.js";
import { protect, restrictTo } from "../middlewares/auth.js";

const router = express.Router()

router.route("/").post(addSubscription).get(protect, restrictTo('admin'), getSubscription)
router.route("/:id").get(getOneSubscription).patch(protect, restrictTo('admin'), updateSubscription).delete(protect, restrictTo('admin'), deleteSubscription)

export default router