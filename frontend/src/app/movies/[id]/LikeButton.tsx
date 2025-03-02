"use client";

import React, { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import apiFetch from "@/api/server";
import { getMe } from "@/api/server/auth";

const LikeButton = ({ movieId }: { movieId: number }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMe();
      if (user) {
        setLoggedIn(true);
        setUserId(user.id);
      } else {
        console.log("LIKEBUTTON COULD NOT LOG IN USER");
      }

      // Check if the movie is liked by the user
      const host: string | undefined = process.env.API_MOVIES_URL;
      const endpoint: string = `/lists/${user?.id}/${movieId}`;
      const res = await apiFetch(host!, endpoint, {}, false);

      if (res) {
        setLiked(true);
      }
    };
    fetchUser();
  }, []);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void | null> => {
    e.preventDefault();

    if (!loggedIn) {
      redirect("/login");
    }

    const host: string | undefined = process.env.API_MOVIES_URL;
    const endpoint: string = "/auth";

    if (!liked) {
      setLiked(true);

      // Call the api to like the movie
      await apiFetch(
        host!,
        `${endpoint}/lists/${userId}/${movieId}`,
        { method: "POST" },
        false
      );
    } else {
      setLiked(false);

      // Call the api to unlike the movie
      await apiFetch(
        host!,
        `${endpoint}/lists/${userId}/${movieId}`,
        { method: "DELETE" },
        false
      );
    }
  };

  return loggedIn ? (
    liked ? (
      <>
        <button onClick={handleLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart-fill text-red-500"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
            />
          </svg>
        </button>
        <span className="text-gray-300">This movie is in your list.</span>
      </>
    ) : (
      <>
        <button onClick={handleLike}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-heart"
            viewBox="0 0 16 16"
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
          </svg>
        </button>
        <span className="text-gray-300">This movie is not in your list.</span>
      </>
    )
  ) : (
    <>
      <p className="text-gray-300">
        Please log in to your account to add this movie to your list.
      </p>
    </>
  );
};

export default LikeButton;
