import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const data = await req.json().catch(() => ({}));
    const now = new Date().toISOString();
    const entry = { ts: now, ip: req.headers.get('x-real-ip') || req.headers.get('x-forwarded-for') || null, data };
    const logPath = path.join(process.cwd(), 'C:\\temp\\client_clicks.log');
    try {
      fs.appendFileSync(logPath, JSON.stringify(entry) + '\n');
    } catch (e) {
      // ignore file write errors
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
