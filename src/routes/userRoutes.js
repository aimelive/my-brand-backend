import express from "express";
import { getAllUsers, createUser, updateUser, getUser, deleteUser, login, updatePassword } from "./../controllers/userController.js";
import signup from "../middlewares/signup.middleware.js";
import { protect, restrictTo } from "../middlewares/auth.js";
import { changePwd } from "../middlewares/update.password.js";


const router = express.Router()

router.route("/").get(protect, restrictTo('admin'), getAllUsers)

router.route("/login").post(login)

router.route("/signup").post(signup, createUser)

router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser)

router.route("/change/password").patch(protect, changePwd, updatePassword)

export default router