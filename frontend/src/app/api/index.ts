
const host = `http://localhost:3001`;

type ApiFetchOptions = {
  method?: string; 
  headers?: Record<string, string>;
  body?: string;
};

const getToken = () => {
  return localStorage.getItem("token");
};

export const apiFetch = async (endpoint: string, options: ApiFetchOptions = {}) => {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };

  const response = await fetch(`${host}${endpoint}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    console.error(errorMessage);
    throw new Error(`Request failed! Status: ${response.status}, Message: ${errorMessage}`);
  }
  return response.json();
};