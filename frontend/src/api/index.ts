type ApiFetchOptions = {
  method?: string; 
  headers?: Record<string, string>;
  body?: string;
};

const getToken = () => {
  return false //localStorage.getItem("token");
};

export const apiFetch = async (host:string, endpoint: string, options: ApiFetchOptions = {}): Promise<Response | null> => {
  const token = getToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),
  };

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
      console.error(`Request failed! Status: ${response.status}, Message: ${errorMessage}`);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};
