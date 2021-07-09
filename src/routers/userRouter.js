import express from "express";
import { edit, remove, logout, see, startGithubLogin } from "../controllers/userController"
const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/start-github-login", startGithubLogin)
userRouter.get("/:id(\\d+/)", see);

export default userRouter;