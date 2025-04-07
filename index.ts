import express, { Request, Response } from "express";
import errorHandler from "./src/v1/middlewares/errorhandler";
import setupSwagger from "./src/swagger";
import dotenv from "dotenv";
import loginRoute from "./src/v1/routes/login.route";
import bodyParser from "body-parser";
import signUpRoute from "./src/v1/routes/sign-up.route";
import profileRoute from "./src/v1/routes/profile.route";
import auth from "./src/v1/middlewares/verifyToken";
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
app.use(auth);
app.use(profileRoute);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
