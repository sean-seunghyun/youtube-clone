import express from "express";
import { search, home } from "../controllers/videoController"
import { login, getJoin, postJoin } from "../controllers/userController"
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.get("/search". search);

export default rootRouter;

