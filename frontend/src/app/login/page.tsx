import LoginForm from "@/app/login/LoginForm";

export default function Login() {
  return (
    <main className="flex flex-col gap-8 items-center w-full">
      {/* Hero Section */}
      <div
        className="w-full bg-cover bg-center h-80 sm:h-96 text-white flex flex-col justify-end p-8"
        style={{ backgroundImage: "url('https://picsum.photos/1920/1080')" }}
      >
        <h2 className="text-4xl font-bold mb-2">Welcome Back to Teflix</h2>
        <p className="text-lg">
          Sign in to continue watching your favorite movies and series.
        </p>
      </div>

      {/* Login Form Section */}
      <LoginForm />
    </main>
  );
}
