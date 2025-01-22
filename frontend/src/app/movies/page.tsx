"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getMovies } from "@/api/movies";
import { useEffect, useState } from "react";
import { Movie } from "@/types/movies";

export default function Movies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies();
      setMovies(res);
      console.log(res);
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  fetch("/api/movies", {
    method: "GET",
  }).then((res) => {
    console.log(res);
  });

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
      <h1 className="text-4xl font-bold mb-6">Movies</h1>

      {/* Movie List */}
      <section className="w-full">
        <h3 className="text-2xl font-bold mb-4">Browse All Movies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {movies.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer"
              onClick={() => handleMovieClick(item.id)}
            >
              <div
                key={item.id}
                className="bg-gray-300 h-40 sm:h-60 rounded overflow-hidden"
              >
                <Image
                  src={item.imageUrl || "https://picsum.photos/300/400"}
                  alt={item.title}
                  width={300}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center text-lg font-semibold">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
