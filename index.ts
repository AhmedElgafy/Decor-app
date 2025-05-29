import express, { Request, Response } from "express";
import errorHandlerMW from "./src/v1/middlewares/errorhandler";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import notFoundMW from "./src/v1/middlewares/notFound";
import requestLogger from "./src/v1/middlewares/logger";
import appV1APIRouter from "./src/v1/index";
dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(requestLogger);
app.use(express.json());
app.use(bodyParser.urlencoded());
app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>hello from backend</h1>");
  return;
});
app.use("/v1", appV1APIRouter);
app.use(errorHandlerMW);
app.use(notFoundMW);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
