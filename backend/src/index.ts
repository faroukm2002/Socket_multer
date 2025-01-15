import { globalError } from "./middleware/globalErrorMiddleware";
import express, { Request, Response } from "express";
import { Server } from "socket.io";
import { dbConnection } from "../database/dbConnection";
import dotenv from "dotenv";
import productRouter from "./modules/product/product.routes";
import { AppError } from "./utils/AppError";
dotenv.config();

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.static("uploads"))
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from the backend!");
});
app.use("/api/v1/product", productRouter);

dbConnection();
const server = app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);

const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"],
  },
});

// connection
io.on("connection", (socket) => {
  console.log("welcome from sockets", socket.id);
  socket.on("disconnect", () => {
    console.log("disconnect");
  });

  // send
  socket.on("newMessage", (data) => {
    console.log(data);
    // Emit the replay event to all other sockets
    io.emit("replay", data);
  });

  socket.on("userTyping", (data) => {
    console.log("typing");
    socket.broadcast.emit("typing", "typing");
  });

  socket.on("stopTyping", (data) => {
    console.log("stopTyping");
    socket.broadcast.emit("stopUserTyping", "");
  });
});

// Handle invalid URLs
app.use("*", (req, res, next) => {
  next(new AppError(`Invalid URL ${req.originalUrl}`, 404));
});

// Global Error Handling Middleware
app.use(globalError);
