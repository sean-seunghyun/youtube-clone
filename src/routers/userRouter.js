import express from "express";
import { remove, logout, see, startGithubLogin, finishGithubLogin, getEdit, postEdit, getChangePassword, postChangePassword } from "../controllers/userController"
import { publicOnlyMiddleware, protectorMiddleware, uploadFileMiddleware } from "../middlewares"
const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFileMiddleware.single('avatar'), postEdit);
userRouter.get("/delete", protectorMiddleware, remove);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin)
userRouter.route("/change-password").all(protectorMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get("/:id(\\d+/)", see);

export default userRouter;