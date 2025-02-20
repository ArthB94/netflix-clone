import { Router } from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../database/queries/movies.js";

const router = new Router();

// Get all movies
router.get("/", async (request, response) => {
  const result = await getMovies();
  response.json(result);
});

// Get movie by id
router.get("/:id", async (request, response) => {
  const { id } = request.params;
  const result = await getMovieById(id);
  response.json(result);
});

// Add a new movie
router.post("/", async (request, response) => {
  await addMovie(request.body);
  response.status(201).send();
});

// Update a movie
router.put("/:id", async (request, response) => {
  const { id } = request.params;
  await updateMovie(id, request.body);
  response.send();
});

// Delete a movie
router.delete("/:id", async (request, response) => {
  const { id } = request.params;
  await deleteMovie(id);
  response.send();
});

export default router;
