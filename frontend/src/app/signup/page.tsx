import SignupForm from "./SignupForm";

export default function Signup() {
  return (
    <main className="flex flex-col gap-8 items-center w-full">
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <div className="absolute left-0 bottom-0 w-full h-48 bg-gradient-to-t from-black/50"></div>
        <div className="z-10">
          <h2 className="text-4xl font-bold mb-2">Join Teflix</h2>
          <p className="text-lg">Sign up to start your journey with us!</p>
        </div>
      </div>

      {/* Signup Form Section */}
      <SignupForm />
    </main>
  );
}
