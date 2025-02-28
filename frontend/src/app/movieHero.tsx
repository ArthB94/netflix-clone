"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { Movie } from "@/types/movies";

function MovieHero({ movie }: { movie: Movie }) {
  const router = useRouter();

  const clickOnMovie = () => {
    router.push(`/movies/${movie.id}`);
  };

  return (
    <div className="w-full h-[70vh] flex flex-col mb-10">
      <div className="absolute w-full h-[70vh] -z-10">
        <img
          src={movie.imageurl}
          alt={movie.title}
          className="relative w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full align-end flex flex-col justify-end p-8 bg-gradient-to-t from-black text-white">
        <div className="w-full cursor-pointer" onClick={clickOnMovie}>
          <div className="sm:w-1/2">
            <h1 className="text-5xl font-semibold ">{movie.title}</h1>
            <p>{movie.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieHero;
