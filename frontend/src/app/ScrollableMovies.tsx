"use client";
import { Movie } from "@/types/movies";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ScrollableMovies({ movies }: { movies: Movie[] }) {
  const router = useRouter();

  const handleMovieClick = (id: number) => {
    router.push(`/movies/${id}`);
  };

  return (
    // <div className="w-full">
    <div className="grid grid-flow-col auto-cols-[minmax(150px,_1fr)] gap-4 w-max">
      {movies.map((item) => (
        <div
          key={item.id}
          className="cursor-pointer items-center flex flex-col"
          onClick={() => handleMovieClick(item.id)}
        >
          <div className="bg-gray-300 w-44 h-60 rounded-xl overflow-hidden bg-transparent">
            <Image
              src={item.imageurl || "https://piscum.photos/300/400"}
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
    // </div>
  );
}
