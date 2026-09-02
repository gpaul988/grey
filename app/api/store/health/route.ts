import { NextResponse } from 'next/server';

export async function GET() {
  const bootTime = Number((globalThis as { __storeBoot?: number }).__storeBoot ?? Date.now());

  return NextResponse.json({
    ok: true,
    service: 'storefront',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.max(0, Math.round((Date.now() - bootTime) / 1000)),
    status: 'healthy',
  });
}

if (!(globalThis as { __storeBoot?: number }).__storeBoot) {
  (globalThis as { __storeBoot?: number }).__storeBoot = Date.now();
}
