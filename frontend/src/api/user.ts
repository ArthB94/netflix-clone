import { apiFetch } from ".";

const endpoint = "/user";

export const login = async (email: string, password: string) => {
  const res =  apiFetch(`${endpoint}/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  console.log(res);
  return res;
};

export const signup = async (email: string, password: string) => {
  const res =  apiFetch(`${endpoint}/signup`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  console.log(res);
  return res;
};

export const me = async () => {
  const res =  apiFetch(`${endpoint}/me`);
  console.log(res);
  return res;
};

export const logout = async () => {
  const res =  apiFetch(`${endpoint}/logout`);
  console.log(res);
  return res;
};

