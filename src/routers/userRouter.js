import express from "express";
import { remove, logout, see, startGithubLogin, finishGithubLogin, getEdit, postEdit } from "../controllers/userController"
const userRouter = express.Router();

userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishGithubLogin)
userRouter.get("/:id(\\d+/)", see);

export default userRouter;