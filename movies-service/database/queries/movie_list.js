import { db } from "../db_connection.js";

const getMovieList = async (user_id) => {
  const movieList = await db("user_movie_list").select("*").where({ user_id });
  return movieList;
};

const isMovieInList = async (user_id, movie_id) => {
  const movie = await db("user_movie_list")
    .select("*")
    .where({ user_id, movie_id })
    .first();
  return movie;
};

const addMovieToList = async (user_id, movie_id) => {
  await db("user_movie_list").insert({
    user_id,
    movie_id,
  });
};

const removeMovieFromList = async (user_id, movie_id) => {
  await db("user_movie_list").where({ user_id, movie_id }).del();
};

export { getMovieList, isMovieInList, addMovieToList, removeMovieFromList };
