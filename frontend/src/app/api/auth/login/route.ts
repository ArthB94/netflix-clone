import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log(email, password);
  const res = await fetch(`${process.env.API_AUTH_URL || 'http://localhost:3001'}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.message || 'Login failed' }, { status: res.status });
  }

  // On stocke le token dans un cookie sécurisé
  const response = NextResponse.json(data);
  response.cookies.set('auth_token', data.token, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24, // 1 jour
  });
  console.log('fetchLoginRoute data: ', response);
  return response;
}
