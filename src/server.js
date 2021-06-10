import express from "express"
import morgan from "morgan"
import bodyParser from "body-parser"





import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();
const PORT = '4000';
const logger = morgan("dev");


app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');

app.use(logger);

app.use(bodyParser.json()) //req.body 요청
app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

const handleListening = () => console.log(`server listening on port: http://localhost:${PORT}`);
app.listen(PORT, handleListening);

