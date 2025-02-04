import UserInfo from "@/app/me/UserInfo";
import {getMe} from "@/api/server/auth";
import { Suspense } from "react";

export default async function MePage() {
  const UserInfoWrapper = async () => {
    const user = await getMe();
    return <UserInfo user={user} />
  }

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
        <UserInfoWrapper />
      </Suspense>


    </main>
  );
}
