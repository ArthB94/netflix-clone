import { Suspense } from "react";
import SignupForm from "./SignupForm";

export default function Signup() {

  return (
    <main className="flex flex-col gap-8 items-center w-full p-4 sm:p-8">
      {/* Hero Section */}
      <Suspense fallback={<p>Loading...</p>}>
      <div
        className="w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <h2 className="text-4xl font-bold mb-2">Join Teflix</h2>
        <p className="text-lg">Sign up to start your journey with us!</p>
        </div>
      </Suspense>

      {/* Signup Form Section */}
      <SignupForm />     
    </main>
  );
}
