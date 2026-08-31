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

/**
 * Multer instance for general client file uploads (15 MB cap).
 * ⚠️ This instance is currently unused. If wired up for ticket attachments or
 * other features, ensure user input is validated to prevent arbitrary file uploads.
 * Currently has a permissive fileFilter (no MIME restrictions) — safe only because
 * it's not used. If used, add MIME-type filtering below.
 */
const SAFE_FILE_TYPES = [
    'application/pdf',
    'text/plain',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

export const fileUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, ensureUploadDir('files')),
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
    }),
    limits: { fileSize: 15 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (SAFE_FILE_TYPES.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`File type not allowed: ${file.mimetype}. Allowed types: PDF, TXT, JPG, PNG, DOC, DOCX.`));
        }
    },
});

/** Multer instance for ad creatives (5 MB cap, image only). */
export const adUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, ensureUploadDir('ads')),
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (IMAGE_TYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    },
});

/** Multer instance for the media library (8 MB cap, image only). */
export const mediaUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, ensureUploadDir('media')),
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
    }),
    limits: { fileSize: 8 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (IMAGE_TYPES.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only image files are allowed'));
    },
});

/** Multer instance for CV / resume uploads (5 MB cap, PDF/DOC/DOCX only). */
export const cvUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, ensureUploadDir('cvs')),
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowed = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        ];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only PDF, DOC, or DOCX files are allowed for CV uploads'));
    },
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

/** Multer instance for product demo video uploads (25 MB cap, common video types). */
export const productVideoUpload = multer({
    storage: multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, ensureUploadDir('products')),
        filename: (_req, file, cb) => cb(null, safeName(file.originalname)),
    }),
    limits: { fileSize: 25 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        const allowed = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error('Only MP4, WebM, MOV, or AVI video files are allowed'));
    },
});
