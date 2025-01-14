// get movie by id
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  const res = await fetch(`${process.env.API_MOVIES_URL || 'http://localhost:3001'}/movies/getMovie/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.message || 'Get movie failed' }, { status: res.status });
  }

  return NextResponse.json(data);
}