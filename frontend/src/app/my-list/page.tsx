import { Movie } from "@/types/movies";
import MyList from "./MyList";
import { Suspense } from "react";
import apiFetch from "@/api/server";
import { getMe } from "@/api/server/auth";

const endpoint = "/movies/list";
const host = process.env.API_MOVIES_URL;

const getUserMovies = async (userId: number): Promise<Movie[]> => {
  console.log("Host from getMovies:", host);
  const res = await apiFetch(host!, `${endpoint}/${userId}`);
  if (!res) {
    throw new Error("Failed to fetch movies");
  }
  const movies: Movie[] = await res;
  return movies;
};

export default function Movies() {
  const MovieListWrapper = async () => {
    const user = await getMe();
    if (!user) {
      throw new Error("Failed to fetch user");
    }
    const res = await getUserMovies(user.id);
    return <MyList movies={res} />;
  };

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-2/3 mx-auto">
      <div className="mt-16">
        <h1 className="text-4xl font-bold mb-6">My List</h1>

        {/* Movie List */}
        <section className="w-full">
          <h3 className="text-2xl font-bold mb-4">
            Browse All Movies in your Personal List
          </h3>
          <Suspense fallback={<p>Loading...</p>}>
            <MovieListWrapper />
          </Suspense>
        </section>
      </div>
    </main>
  );
}
