import express from "express";
import apiRouter from "./api";

const app = express();

app.use(express.json());

app.get("/healthy", (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: "healthy" });
});
app.use("/ai", apiRouter);
app.listen(3000, () => {
  console.log("app is listening on http://localhost:3000");
});
