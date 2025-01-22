// import { apiFetch } from ".";
import { Movie } from "@/types/movies";
// const endpoint = "/movies";

export const getMovies = async (): Promise<Movie[]> => {
  // const res =  apiFetch(`${endpoint}`)
  const res = movies;
  return res;
};

export const getMovie = async (id: number): Promise<Movie> => {
  // const res = apiFetch(`${endpoint}/${id}`)
  id = parseInt(id.toString());
  const res = movies.find((movie) => movie.id === id) || movies[0];
  return res;
};

const movies: Movie[] = [
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
];
