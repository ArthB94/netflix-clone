"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Exemple de validation basique pour email et mot de passe
    if (email === 'user@example.com' && password === 'password123') {
      router.push('/'); // Redirige vers la page d'accueil si la connexion réussit
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <main className="flex flex-col gap-8 items-center w-full p-4 sm:p-8">
      {/* Hero Section */}
      <div className="w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8" 
           style={{ backgroundImage: 'url(\'https://via.placeholder.com/1920x1080\')' }}>
        <h2 className="text-4xl font-bold mb-2">Welcome Back to Teflix</h2>
        <p className="text-lg">Sign in to continue watching your favorite movies and series.</p>
      </div>

      {/* Login Form Section */}
      <section className="w-full max-w-md bg-white rounded-lg p-8 shadow-md">
        <h3 className="text-2xl font-bold mb-4 text-center">Login</h3>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-semibold">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-semibold">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don&#39;t have an account? 
            <button
              onClick={() => router.push('/signup')}
              className="text-red-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
