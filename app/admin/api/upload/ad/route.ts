import { NextRequest, NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const UPLOADS_ROOT = path.join(process.cwd(), 'Admin', 'public', 'uploads');

function ensureUploadDir(sub: string): string {
  const dir = path.join(UPLOADS_ROOT, sub);
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

function publicUrl(sub: string, filename: string): string {
  return `/uploads/${sub}/${filename}`;
}

function safeName(original: string): string {
  const ext = path.extname(original).toLowerCase().replace(/[^.a-z0-9]/g, '') || '.bin';
  return `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
}

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ ok: false, message: 'No image provided' }, { status: 400 });
    }

    // Validate MIME type
    if (!IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { ok: false, message: 'Only image files (JPEG, PNG, WebP, GIF) are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (5 MB cap for ads)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { ok: false, message: 'File size must not exceed 5 MB' },
        { status: 400 }
      );
    }

    // Save file
    const uploadDir = ensureUploadDir('ads');
    const filename = safeName(file.name);
    const filepath = path.join(uploadDir, filename);

    const buffer = await file.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));

    const url = publicUrl('ads', filename);

    console.log('[admin-ads-upload] Image uploaded:', filename);

    return NextResponse.json(
      { ok: true, data: { url, filename } },
      { status: 201 }
    );
  } catch (error) {
    console.error('[admin-ads-upload] Error:', error);
    return NextResponse.json(
      { ok: false, message: 'Failed to upload image' },
      { status: 500 }
    );
  }
}
