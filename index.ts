import express, { Request, Response } from "express";
import errorHandlerMW from "./src/v1/middlewares/errorhandler";
import setupSwagger from "./src/swagger";
import dotenv from "dotenv";
import loginRoute from "./src/v1/routes/login.route";
import bodyParser from "body-parser";
import signUpRoute from "./src/v1/routes/sign-up.route";
import profileRoute from "./src/v1/routes/profile.route";
import authMW from "./src/v1/middlewares/verifyToken";
import userRoute from "./src/v1/routes/user.route";
import notFoundMW from "./src/v1/middlewares/notFound";
dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(express.json());
app.use(bodyParser.urlencoded());
setupSwagger(app);
app.get("/", (req: Request, res: Response) => {
  console.log(req.path);
  res.send("Hello World!");
});
app.use(loginRoute);
app.use(signUpRoute);
app.use(authMW);
app.use(profileRoute);
app.use(userRoute);
app.use(errorHandlerMW);
app.use(notFoundMW);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
