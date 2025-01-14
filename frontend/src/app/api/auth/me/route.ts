// src/app/api/auth/me/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  try {
    const res = await fetch(`${process.env.API_AUTH_URL || 'http://localhost:3001'}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-api-key': process.env.INTERNAL_API_KEY as string,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Invalid token' }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error verifying token' }, { status: 500 });
  }
}
