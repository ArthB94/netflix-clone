import UserInfo from "@/app/me/UserInfo";
import { User } from "@/types/auth";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function MePage() {
  const myCookie = await cookies()
  const token = myCookie.get('auth_token')
  if (!token) return { status: 302, headers: { Location: '/login' } }

  const res = await fetch(`${process.env.API_AUTH_URL || 'http://localhost:3001'}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`, // Envoi du token dans l'en-tête Authorization
    },
  });
  const { user } = await res.json();

  return (
    <main className="flex flex-col gap-8 items-center w-full p-4 sm:p-8">
      {/* Hero Section */}
      <Suspense fallback={<p>Loading...</p>}>
      <div
        className="w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <h2 className="text-4xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-lg">Here are your account details.</p>
        </div>
      </Suspense>

      {/* User Info Section */}
      <Suspense fallback={<p>Loading...</p>}>
        <UserInfo user={user} />
      </Suspense>


    </main>
  );
}
