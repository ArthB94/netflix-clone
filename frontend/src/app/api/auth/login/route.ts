import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password } = await req.json();
  console.log(`API_AUTH_URL: ${process.env.API_AUTH_URL}`);

  const res = await fetch(`${process.env.API_AUTH_URL || 'http://localhost:3001'}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.message || 'Login failed' }, { status: res.status });
  }

  return NextResponse.json(data);
}