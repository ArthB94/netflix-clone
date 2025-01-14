// get movie by id
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
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