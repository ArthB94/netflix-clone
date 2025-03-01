"use server";
import { cookies } from "next/headers";
type ApiFetchOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  tokenNeeded?: boolean;
};

export const getToken = async () => {
  const token = (await cookies()).get("auth_token")?.value;
  return token || null;
};

const apiFetch = async (
  host: string,
  endpoint: string,
  options: ApiFetchOptions = {},
  tokenNeeded: boolean = false
) => {
  const token = await getToken();
  console.log("Host from apiFetch:", host);
  if (!host) {
    console.error("API host is not defined");
    return null;
  }

  if (tokenNeeded && !token) {
    console.log("Token is not defined");
    return null;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  console.log("Headers:", headers);

  try {
    const response = await fetch(`${host}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.log(
        `Request failed! Status: ${response.status}, Message: ${errorMessage}`
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.log("Fetch error:", error);
    return null;
  }
};

export default apiFetch;
