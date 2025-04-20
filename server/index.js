import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
const app = express();
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middlewares/errorMiddlewaves.js";
import routes from "./routes/index.js";
import { dbConnection } from "./utils/index.js";
import bodyParser from "body-parser";
import http from "http";
// It allows the Express app to handle HTTP requests.
const server = http.createServer(app); //create http server by passing express instance
import { Server } from "socket.io";
import socketHandler from "./utils/socketHandler.js";
dotenv.config();

dbConnection();

const PORT = process.env.PORT || 5000;

const corsConfig = {
  // origin: [
  //   "http://localhost:3000",
  //   "http://localhost:3011",
  //   "https://cloud-task-manager-frontend.vercel.app",
  //   "https://cloud-task-manager-backend-y3hm.onrender.com"
  // ],
  origin: "*",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsConfig));

//socket io setup
const socketIO = new Server(server, {
  transports: ["websocket"],
  cors: corsConfig,
});

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(morgan("dev"));

socketHandler(socketIO);

app.get("/", (req, res) => {
  res.send(`<h1>Hi Developer, Your website is running at ${PORT} port</h1>`);
});

app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
