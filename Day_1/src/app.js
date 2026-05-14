import express from "express";
import dotenv from "dotenv";
dotenv.config();
import productroute from "./routes/product.route.js";



const app = express();
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use("/api/v1/product",productroute)

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});



export default app;

