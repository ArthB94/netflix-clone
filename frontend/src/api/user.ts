export const login = async (email: string, password: string) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const signup = async (email: string, username: string, password: string) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, username, password }),
  });
  return res.json();
};

export const me = async () => {
  const res = await fetch('/api/auth/me');
  return res.json();
};

export const logout = async () => {
  const res = await fetch('/api/auth/logout', { method: 'POST' });
  return res.json();
};
