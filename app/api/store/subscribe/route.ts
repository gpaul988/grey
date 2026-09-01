import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SUB_PATH = path.join(process.cwd(), 'Admin', 'data', 'subscribers.json');

function ensureDataDir() {
  const dir = path.dirname(SUB_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || '').trim().toLowerCase();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    ensureDataDir();
    let arr: string[] = [];
    try {
      if (fs.existsSync(SUB_PATH)) {
        const raw = fs.readFileSync(SUB_PATH, 'utf8');
        arr = JSON.parse(raw || '[]');
      }
    } catch (e) {
      // ignore parse errors and start fresh
      arr = [];
    }

    if (!arr.includes(email)) arr.push(email);
    fs.writeFileSync(SUB_PATH, JSON.stringify(arr, null, 2), 'utf8');

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error('[Subscribe POST]', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(SUB_PATH)) return NextResponse.json({ subscribers: [] });
    const raw = fs.readFileSync(SUB_PATH, 'utf8');
    const arr = JSON.parse(raw || '[]') as string[];
    return NextResponse.json({ subscribers: arr });
  } catch (err) {
    console.error('[Subscribe GET]', err);
    return NextResponse.json({ subscribers: [] }, { status: 500 });
  }
}
