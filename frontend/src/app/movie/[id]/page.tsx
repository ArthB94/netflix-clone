import { Movie } from '@/types/movies';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import { getMovie } from '@/api/movies';

async function fetchMovie(id: number): Promise<Movie | undefined> {
  const res = await getMovie(id);
  return res;
}

export default async function MovieDetail({
  params,
}: {
  params: Promise<{ id: number }>; // Correct type to match constraint
}) {
  const { id } = await params; // Await params since it's a Promise
  if (!id) {
    redirect('/login');
  }

  const movie = await fetchMovie(id);
  if (!movie) {
    redirect('/movies');
  }

  return (
    <main className="w-full p-8">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="w-full sm:w-1/3">
          <Image
            src={movie.imageUrl || 'https://via.placeholder.com/300x400'}
            alt={movie.title}
            className="w-full h-full object-cover rounded"
            width={300}
            height={400}
          />
        </div>
        <div className="w-full sm:w-2/3">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-4">{movie.description}</p>
          <p className="text-sm text-gray-600">Release Date: {movie.year}</p>
          <p className="text-sm text-gray-600">Rating: {movie.rating}</p>
        </div>
      </div>
    </main>
  );
}
