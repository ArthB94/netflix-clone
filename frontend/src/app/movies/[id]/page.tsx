import { Movie } from "@/types/movies";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getMovie } from "@/api/server/movies";
import React from "react";
import LikeButton from "./LikeButton";

async function fetchMovie(id: number): Promise<Movie | undefined> {
  const res = await getMovie(id);
  return res;
}

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  let movie: Movie | undefined = undefined;

  if (!id) {
    redirect("/login");
  }
  movie = await fetchMovie(id);
  if (!movie) {
    redirect("/movies");
  }

  if (!movie) {
    return <div>Loading...</div>;
  }

  movie = movie as Movie;

  return (
    <main className="w-full p-8">
      <div className="flex flex-col sm:flex-row gap-8 w-2/3 sm:w-full mx-auto pt-16 lg:w-2/3">
        <div className="relative w-full sm:w-1/3">
          <Image
            src={movie.imageurl || "https://placehold.co/300x400"}
            alt={movie.title}
            className="w-full h-full object-cover rounded"
            width={300}
            height={400}
          />
          {/* Blurred background image */}
          <Image
            src={movie.imageurl || "https://placehold.co/300x400"}
            alt={movie.title}
            className="absolute top-0 left-0 w-full h-full object-cover -z-50 blur-3xl saturate-200 brightness-50"
            width={300}
            height={400}
            draggable={false}
          />
        </div>
        <div className="w-full sm:w-2/3">
          <h1 className="text-center sm:text-left text-4xl font-bold mb-4">
            {movie.title}
          </h1>
          <p className="text-lg mb-4">{movie.description}</p>
          <p className="text-sm text-gray-300">Release Date: {movie.year}</p>
          <p className="text-sm text-gray-300">Rating: {movie.globalrating}</p>
          <div className="flex flex-row gap-2 mt-2">
            <LikeButton movieId={id} />
          </div>
        </div>
      </div>
    </main>
  );
}
