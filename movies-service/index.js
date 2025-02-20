import express from "express";
import dotenv from "dotenv";
import moviesRoutes from "./routes/movies.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Film service!");
});

// Movies routes
app.use("/movies", moviesRoutes);

app.listen(port, () => {
  console.log(`Film service listening at http://localhost:${port}`);
});
