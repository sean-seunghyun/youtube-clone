import express from "express";
import { remove, logout, see, startGithubLogin, finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword } from "../controllers/userController"
import { publicOnlyMiddleware, protectorMiddleware, uploadAvatarMiddleware } from "../middlewares"
const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadAvatarMiddleware.single('avatar'), postEdit);
userRouter.get("/delete", protectorMiddleware, remove);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin)
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id", see);

export default userRouter;