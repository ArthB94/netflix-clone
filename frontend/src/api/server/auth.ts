import { User } from "@/types/auth";
import apiFetch from ".";

const host = process.env.API_AUTH_URL;
const endpoint = "/auth";

export const getMe = async () : Promise<User> => {
  const res = await apiFetch(host!, `${endpoint}/me`, {} , true); 
  if (!res) {
    return null;
  }
  return res.user;
};

