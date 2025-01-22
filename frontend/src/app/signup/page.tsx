"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/api/user";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email && username && password.length >= 6) {
      try {
        const res = await signup(email, username, password);
        console.log(res);
        if (res && res.ok) {
          router.push("/"); // Redirige vers la page d'accueil après l'inscription réussie
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
        console.error(error);
      }
    } else {
      setError(
        "Please fill all fields correctly. Password must be at least 6 characters."
      );
    }
  };

  return (
    <main className="flex flex-col gap-8 items-center w-full p-4 sm:p-8">
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <h2 className="text-4xl font-bold mb-2">Join Teflix</h2>
        <p className="text-lg">Sign up to start your journey with us!</p>
      </div>

      {/* Signup Form Section */}
      <section className="w-full max-w-md bg-white rounded-lg p-8 shadow-md text-gray-500">
        <h3 className="text-2xl font-bold mb-4 text-center">Sign Up</h3>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-lg font-semibold">
              Email
            </label>
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
            <label htmlFor="username" className="block text-lg font-semibold">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-semibold">
              Password
            </label>
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
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?
            <button
              onClick={() => router.push("/login")}
              className="text-red-600 hover:underline"
            >
              Log In
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
