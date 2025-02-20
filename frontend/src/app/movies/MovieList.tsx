"use client";
import { Movie } from "@/types/movies";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MovieList({ movies }: { movies: Movie[] }) {
  const router = useRouter();

  const handleMovieClick = (id: number) => {
    router.push(`/movies/${id}`);
  };

  return (
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
              src={item.imageurl || "https://picsum.photos/300/400"}
              alt={item.title}
              width={300}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center text-lg font-semibold">{item.title}</div>
        </div>
      ))}
    </div>
  );
}
