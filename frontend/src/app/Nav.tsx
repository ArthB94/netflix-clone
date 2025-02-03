// app/components/AuthLinks.tsx
"use client";

import React from "react";
import ActiveLink from "../components/ActiveLink";
import { useAuth } from "../components/AuthContext";

export default function AuthLinks() {
  const { user } = useAuth();

  return (
    <nav className="flex gap-4">
      <ActiveLink href="/">Home</ActiveLink>
      <ActiveLink href="/movies">Movies</ActiveLink>
      <ActiveLink href="/series">Series</ActiveLink>
      {/* Afficher Login uniquement si l'utilisateur n'est pas connecté */}
      {user ?
        <>
          <ActiveLink href="/my-list">My List</ActiveLink>
          <ActiveLink href="/me">User Info</ActiveLink>
        </>
        :
      <ActiveLink href="/login">Login</ActiveLink>
    }
    </nav>
  );
}
