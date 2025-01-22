"use client";
import { getMovies } from "@/api/movies";
import { Movie } from "@/types/movies";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await getMovies();
      setMovies(res);
    };

    fetchMovies();
  }, []);

  const router = useRouter();

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <main className="max-w-min flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <h2 className="text-4xl font-bold mb-2">Welcome to Teflix</h2>
        <p className="text-lg">
          Watch your favorite movies and series anytime, anywhere.
        </p>
        <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold">
          Start Watching
        </button>
      </div>

      {/* Popular Movies Section */}
      <section className="max-w-7xl">
        <h3 className="text-2xl font-bold mb-4">Popular Movies</h3>

        {/* Conteneur de films avec défilement horizontal */}
        <div className="w-full overflow-x-auto">
          <div className="grid grid-flow-col auto-cols-[minmax(150px,_1fr)] gap-4 w-max">
            {movies.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer"
                onClick={() => handleMovieClick(item.id)}
              >
                <div className="bg-gray-300 h-40 sm:h-60 rounded overflow-hidden">
                  <Image
                    src={item.imageUrl || "https://piscum.photos/300/400"}
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
        </div>
      </section>
    </main>
  );
}
