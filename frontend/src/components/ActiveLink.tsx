// app/components/ActiveLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type ActiveLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ActiveLink({ href, children }: ActiveLinkProps) {
  const pathname = usePathname();
  // Vous pouvez adapter la logique pour gérer les sous-chemins
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`hover:underline ${isActive ? "text-red-600 font-bold" : ""}`}
    >
      {children}
    </Link>
  );
}
