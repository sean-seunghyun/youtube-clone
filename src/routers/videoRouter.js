import express from "express";
import { watch, getEdit, postEdit, remove, getUpload, postUpload, search } from "../controllers/videoController"
import {publicOnlyMiddleware, protectorMiddleware, uploadVideoMiddleware} from "../middlewares"
const videoRouter = express.Router();



videoRouter.route("/upload").all(protectorMiddleware).get(getUpload).post(uploadVideoMiddleware.single('video'), postUpload);
videoRouter.get("/search", search);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, remove);

export default videoRouter;