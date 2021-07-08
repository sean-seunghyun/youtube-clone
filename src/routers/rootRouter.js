import express from "express";
import { search, home } from "../controllers/videoController"
import { getLogin, postLogin, getJoin, postJoin } from "../controllers/userController"
const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search);

export default rootRouter;

