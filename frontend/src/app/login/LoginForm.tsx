// src/components/LoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../components/AuthContext";

export default function LoginForm() {

  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      login(email, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full max-w-md bg-white rounded-lg p-8 shadow-md text-gray-500">
        <h3 className="text-2xl font-bold mb-4 text-center">Login</h3>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
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
            Log In
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Don&#39;t have an account?
            <button
              onClick={() => router.push("/signup")}
              className="text-red-600 hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </section>
  );
}
