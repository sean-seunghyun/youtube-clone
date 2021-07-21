import express from "express"
import morgan from "morgan"
import session from "express-session"
import MongoStore from "connect-mongo";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";

import { localsMiddleware } from "./middlewares";




const app = express();
const logger = morgan("dev");


app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(logger);

app.use(express.json()) //req.body 요청
app.use(express.urlencoded({ extended: true }))

app.use( //cookie를 이용해서 session을 주고 받는다.
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.DB_URL
        })
    })
);

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);
app.use("/uploads", express.static('uploads'));

export default app


