"use server";

import apiFetch from "./";
import { Movie } from "@/types/movies";
const endpoint = "/movies";

const host = process.env.API_MOVIES_URL || "http://teleflix.api";

export const getMovies = async (): Promise<Movie[]> => {
  console.log("Host from getMovies:", host);
  const res = await apiFetch(host, `${endpoint}`);
  if (!res) {
    throw new Error("Failed to fetch movies");
  }
  const movies: Movie[] = await res;
  //console.log("Movies:", movies);
  return movies;
};

export const getMovie = async (id: number): Promise<Movie> => {
  id = parseInt(id.toString());
  const res = await apiFetch(host, `${endpoint}/${id}`);
  if (!res) {
    throw new Error(`Failed to fetch movie with id: ${id}`);
  }
  console.log("Movie:", res);
  return res;
};
