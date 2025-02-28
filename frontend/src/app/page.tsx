import { Suspense } from "react";
import ScrollableMovies from "./ScrollableMovies";
import { getMovie, getMovies } from "@/api/server/movies";
import { Movie } from "@/types/movies";
import MovieHero from "./movieHero";

export default async function Home() {
  // Get first movie
  const firstMovie = await getMovie(1);

  const MoviesWrapper = async () => {
    const movies = await getMovies();
    return <ScrollableMovies movies={movies} />;
  };

  return (
    <main className="pb-20">
      {/* Hero Section */}
      <Suspense fallback={<p>Loading...</p>}>
        {/* <div
          className="w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
          style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
        >
          <h2 className="text-4xl font-bold mb-2">Welcome to Teleflix</h2>
          <p className="text-lg">
            Watch your favorite movies and series anytime, anywhere.
          </p>
          <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold">
            Start Watching
          </button>
        </div> */}

        {/* First movie */}
        <Suspense fallback={<p>Loading...</p>}>
          <MovieHero movie={firstMovie} />
        </Suspense>

        {/* Show all movies */}
        <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full px-5 sm:px-16">
          {/* Popular Movies Section */}
          <h3 className="text-2xl font-bold mb-4">Popular Movies</h3>
          <section className="w-full overflow-x-auto rounded-xl">
            <Suspense
              fallback={
                <ScrollableMovies
                  movies={Array.from({ length: 10 }).map(
                    (_, index) =>
                      ({
                        id: index,
                        title: "Loading...",
                        imageurl:
                          "https://cdn.vectorstock.com/i/1000v/50/20/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg",
                      } as Movie)
                  )}
                />
              }
            >
              <MoviesWrapper />
            </Suspense>
          </section>
        </div>
      </Suspense>
    </main>
  );
}
