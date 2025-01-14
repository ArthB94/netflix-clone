import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  console.log('GET /api/auth/me');
  const token = req.cookies.get('token');

  if (!token) {
    console.log('No token found');
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  console.log('Token found:', token);

  const res = await fetch(`${process.env.API_AUTH_URL || 'http://localhost:3001'}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token.value}`, // Envoi du token dans l'en-tête Authorization
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.message || 'Failed to fetch user' }, { status: res.status });
  }

  return NextResponse.json(data); // On retourne les informations de l'utilisateur
}
