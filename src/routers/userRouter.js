import express from "express";
import { remove, logout, see, startGithubLogin, finishGithubLogin, getEdit, postEdit } from "../controllers/userController"
import { publicOnlyMiddleware, protectorMiddleware } from "../middlewares"
const userRouter = express.Router();

userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get("/delete", protectorMiddleware, remove);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin)
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin)
userRouter.get("/:id(\\d+/)", see);

export default userRouter;