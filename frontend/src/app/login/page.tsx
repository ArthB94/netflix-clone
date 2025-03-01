import LoginForm from "@/app/login/LoginForm";

export default function Login() {
  return (
    <main className="flex flex-col gap-8 items-center w-full">
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <div className="absolute left-0 bottom-0 w-full h-48 bg-gradient-to-t from-black/50"></div>
        <div className="z-10">
          <h2 className="text-4xl font-bold mb-2">Welcome Back to Teleflix</h2>
          <p className="text-lg">
            Sign in to continue watching your favorite movies and series.
          </p>
        </div>
      </div>

      {/* Login Form Section */}
      <LoginForm />
    </main>
  );
}
