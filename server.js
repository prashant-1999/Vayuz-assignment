import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { markDownToHTML } from "./controllers/convertMarkdown.js";
import cookieParser from "cookie-parser";
import { WebSocketServer } from "ws";

const app = express();
const port = 5000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(limiter);
app.use(helmet());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const server = new WebSocketServer({ port: 8081 });
markDownToHTML(server);
