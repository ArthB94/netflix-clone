import { Router } from "express";
import {
  getMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../database/queries/movies.js";
import {
  getMovieList,
  isMovieInList,
  addMovieToList,
  removeMovieFromList,
} from "../database/queries/movie_list.js";

const router = new Router();

// Get all movies
router.get("/", async (request, response) => {
  const result = await getMovies();
  response.json(result);
});

// MOVIE LISTS
// Get user's movie list
router.get("/list/:id", async (request, response) => {
  const user_id = request.params.id;
  const result = await getMovieList(user_id);
  response.json(result);
});

// Check if movie is in user's list
router.get("/list/:user_id/:movie_id", async (request, response) => {
  const { user_id, movie_id } = request.params;
  const result = await isMovieInList(user_id, movie_id);
  response.json(result);
});

// Add a movie to a user's list
router.post("/list/:user_id", async (request, response) => {
  const { user_id } = request.params;
  const { movie_id } = request.body;
  await addMovieToList(user_id, movie_id);
  response.status(201).send();
});

// Remove a movie from a user's list
router.delete("/list/:user_id/:movie_id", async (request, response) => {
  const { user_id, movie_id } = request.params;
  await removeMovieFromList(user_id, movie_id);
  response.send();
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
