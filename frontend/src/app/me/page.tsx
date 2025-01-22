"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { me, logout } from "@/api/user";

interface User {
  email: string;
  username: string;
  created_at: string;
}

export default function MePage() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await me();
        if (res && res.user.email) {
          setUser(res.user);
          console.log(res.user);
        } else {
          router.push("/login"); // Redirige si l'utilisateur n'est pas connecté
        }
      } catch (error) {
        setError("Failed to load user data.");
        router.push("/login"); // Redirige si une erreur se produit
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login"); // Redirige après déconnexion
    } catch (error) {
      setError("Logout failed. Please try again.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </main>
    );
  }

  return (
    <main className="flex flex-col gap-8 items-center w-full p-4 sm:p-8">
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <h2 className="text-4xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-lg">Here are your account details.</p>
      </div>

      {/* User Info Section */}
      <section className="w-full max-w-md bg-white rounded-lg p-8 shadow-md text-gray-500">
        <h3 className="text-2xl font-bold mb-4 text-center">My Profile</h3>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {user && (
          <div className="space-y-4">
            <div>
              <label className="block text-lg font-semibold">Username</label>
              <p className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 bg-gray-100">
                {user.username}
              </p>
            </div>

            <div>
              <label className="block text-lg font-semibold">Email</label>
              <p className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 bg-gray-100">
                {user.email}
              </p>
            </div>

            <div>
              <label className="block text-lg font-semibold">
                Member Since
              </label>
              <p className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 bg-gray-100">
                {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="w-full mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
            >
              Logout
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
