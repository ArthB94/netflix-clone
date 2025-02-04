"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { User } from '@/types/auth';
import { useAuth } from '../../components/AuthContext';


export default function UserInfo(props: { user: User }) {
  const { user } = props;
  const { logout } = useAuth();

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      setError("Logout failed. Please try again.");
      console.error(error);
    }
  };
  if (!user) return (
    <section className="w-full max-w-md bg-white rounded-lg p-8 shadow-md text-gray-500">
      <h3 className="text-2xl font-bold mb-4 text-center">My Profile</h3>
      <p className="text-red-600 text-center mb-4">User not found</p>
      <button
            onClick={() => router.push("/login")}
            className="w-full mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white font-semibold"
          >
            Login
          </button>
    </section>
  );
  return (
    <section className="w-full max-w-md bg-white rounded-lg p-8 shadow-md text-gray-500">
      <h3 className="text-2xl font-bold mb-4 text-center">My Profile</h3>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {user && (
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-semibold">Username</label>
            <p className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 bg-gray-100">
              {user?.username}
            </p>
          </div>

          <div>
            <label className="block text-lg font-semibold">Email</label>
            <p className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 bg-gray-100">
              {user?.email}
            </p>
          </div>

          <div>
            <label className="block text-lg font-semibold">
              Member Since
            </label>
            <p className="w-full px-4 py-2 mt-2 border rounded-md border-gray-300 bg-gray-100">
              {new Date(user?.created_at).toLocaleDateString()}
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
  )
}
