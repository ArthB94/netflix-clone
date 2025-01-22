import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("Hello, Film service!");
});

app.get("/movies", (req, res) => {
  res.json([
    {
      id: 1,
      title: "Movie 1",
      description: "Description 1",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 2,
      title: "Movie 2",
      description: "Description 2",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 3,
      title: "Movie 3",
      description: "Description 3",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 4,
      title: "Movie 4",
      description: "Description 4",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 5,
      title: "Movie 5",
      description: "Description 5",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 6,
      title: "Movie 6",
      description: "Description 6",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 7,
      title: "Movie 7",
      description: "Description 7",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 8,
      title: "Movie 8",
      description: "Description 8",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 9,
      title: "Movie 9",
      description: "Description 9",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 10,
      title: "Movie 10",
      description: "Description 10",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
    {
      id: 11,
      title: "Movie 11",
      description: "Description 11",
      year: 2021,
      imageUrl: "https://picsum.photos/300/400",
      rating: 5,
    },
  ]);
});

app.get("/movies/:id", (req, res) => {
  const id = req.params.id;
  res.json({
    id: id,
    title: `Movie ${id}`,
    description: `Description ${id}`,
    year: 2021,
    imageUrl: "https://picsum.photos/300/400",
    rating: 5,
  });
});

app.listen(port, () => {
  console.log(`Film service listening at http://localhost:${port}`);
});
