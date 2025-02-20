import { db } from "../db_connection.js";

const getMovies = async () => {
  const movies = await db("movies").select("*");
  return movies;
};

const getMovieById = async (id) => {
  const movie = await db("movies").select("*").where({ id }).first();
  return movie;
};

const addMovie = async (title, description, year, imageurl, globalrating) => {
  await db("movies").insert({
    title,
    description,
    year,
    imageurl,
    globalrating,
  });
};

const updateMovie = async (
  id,
  title,
  description,
  year,
  imageurl,
  globalrating
) => {
  await db("movies").where({ id }).update({
    title,
    description,
    year,
    imageurl,
    globalrating,
  });
};

const deleteMovie = async (id) => {
  await db("movies").where({ id }).del();
};

export { getMovies, getMovieById, addMovie, updateMovie, deleteMovie };
