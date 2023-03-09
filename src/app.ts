import express from "express";
import config from "config";
import connectDB from "./utils/connect";
import log from "./utils/Logger";
import routes from "./routes";
import { deserializeUser } from "./middleware/deserializeUser";
const app = express();
app.use(deserializeUser);
const port = config.get<number>("port");

app.listen(port, async () => {
  log.info("this app is running ");
  routes(app);
  //   await connectDB();
});
