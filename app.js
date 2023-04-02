import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes.js";
import router from "./routes/user-routes.js";
import cors from "cors";
const app = express();
import path from "path";
import dotenv from 'dotenv';
dotenv.config();
const __filename = new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1");
const __dirname = path.dirname(__filename);

console.log(__dirname)

//static files
app.use(express.static(path.resolve(__dirname, "./frontend/build")));

app.get("*", function (req, res) {
  const filePath = path.resolve(__dirname, "./frontend/build/index.html");

  res.sendFile(filePath);
});

app.use(cors());
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => app.listen(5000))
  .then(() =>
    console.log("Connected TO Database and Listening TO Localhost 5000")
  )
  .catch((err) => console.log(err));
