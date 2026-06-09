import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import multer from 'multer';

/** Base directory that backs the public /uploads route. */
export const UPLOADS_ROOT = path.join(process.cwd(), 'Admin', 'public', 'uploads');

/** Ensure an upload subdirectory exists and return its absolute path. */
export function ensureUploadDir(sub: string): string {
    const dir = path.join(UPLOADS_ROOT, sub);
    fs.mkdirSync(dir, { recursive: true });
    return dir;
}

/** Public URL for a stored file. */
export function publicUrl(sub: string, filename: string): string {
    return `/uploads/${sub}/${filename}`;
}

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

const safeName = (original: string): string => {
    const ext = path.extname(original).toLowerCase().replace(/[^.a-z0-9]/g, '') || '.bin';
    return `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
};

/** Multer instance for avatar images (2 MB cap, image MIME only). */
export const avatarUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, ensureUploadDir('avatars')),
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
    }),
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (IMAGE_TYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only image files (JPEG, PNG, WebP, GIF) are allowed'));
    },
});

/** Multer instance for general client file uploads (15 MB cap). */
export const fileUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, ensureUploadDir('files')),
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
    }),
    limits: { fileSize: 15 * 1024 * 1024 },
});

/** Multer instance for product/brand images (5 MB cap, image only). */
export const productUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, ensureUploadDir('products')),
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (IMAGE_TYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    },
});
