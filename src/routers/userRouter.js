import express from "express";
import { edit, remove, logout, see, startGithubLogin, finishtGithubLogin } from "../controllers/userController"
const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/delete", remove);
userRouter.get("/logout", logout);
userRouter.get("/github/start", startGithubLogin)
userRouter.get("/github/finish", finishtGithubLogin)
userRouter.get("/:id(\\d+/)", see);

export default userRouter;