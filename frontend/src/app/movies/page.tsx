import { getMovies } from "@/api/server/movies";
import MovieList from "./MovieList";
import { Suspense } from "react";

export default function Movies() {
  const MovieListWrapper = async () => {
    const res = await getMovies();
    return <MovieList movies={res} />;
  };

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-2/3 mx-auto">
      <div className="mt-16">
        <h1 className="text-4xl font-bold mb-6">Movies</h1>

        {/* Movie List */}
        <section className="w-full">
          <h3 className="text-2xl font-bold mb-4">Browse All Movies</h3>
          <Suspense fallback={<p>Loading...</p>}>
            <MovieListWrapper />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
