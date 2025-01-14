import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, username } = await req.json();

  const res = await fetch(`${process.env.API_AUTH_URL || 'http://localhost:3001'}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, username }),
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    console.log(res);
    return NextResponse.json({ error: data.message || 'Register failed' }, { status: res.status });
  }

  return NextResponse.json(data);
}