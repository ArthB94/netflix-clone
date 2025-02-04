// app/Nav.tsx
import ActiveLink from "../components/ActiveLink";
import { Suspense } from "react";
import { getMe } from "@/api/server/auth";

export default async function AuthLinks() {
  const UserLinks = async () => {
    const user = await getMe();
    return user ?
      <>
        <ActiveLink href="/my-list">My List</ActiveLink>
        <ActiveLink href="/me">User Info</ActiveLink>
      </>
      :
      <ActiveLink href="/login">Login</ActiveLink>
  }

  return (
    <nav className="flex gap-4">
      <ActiveLink href="/">Home</ActiveLink>
      <ActiveLink href="/movies">Movies</ActiveLink>
      <ActiveLink href="/series">Series</ActiveLink>
      {/* Afficher Login uniquement si l'utilisateur n'est pas connecté */}
      <Suspense fallback={<p>Loading...</p>}>
        <UserLinks />
      </Suspense>
    </nav>
  );
}
