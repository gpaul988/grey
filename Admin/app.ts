import express, { type NextFunction, type Request, type Response } from 'express';
import path from 'node:path';
import { mkdir, writeFile } from 'node:fs/promises';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import { ADMIN_BASE_PATH } from './config/adminPaths';
import { ensureAuth } from './middleware/authMiddleware';

dotenv.config({ path: './config.env' });

const app = express();
const port = Number(process.env.PORT ?? 3002);
const runtimePortFile = path.join(process.cwd(), '..', '.backend-port.json');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'partials/layout-vertical');

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET || 'grey-admin-session',
        cookie: { httpOnly: true, sameSite: 'lax' }
    })
);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.session.user || null;
    res.locals.currentYear = new Date().getFullYear();
    res.locals.adminBasePath = ADMIN_BASE_PATH;
    res.locals.frontendBaseUrl = process.env.FRONTEND_BASE_URL || 'http://localhost:3000';
    res.locals.backendBaseUrl = process.env.BACKEND_BASE_URL || `http://localhost:${port}`;
    next();
});

app.use('/', authRoutes);
app.use('/', ensureAuth, adminRoutes);

app.use((req: Request, res: Response) => {
    res.status(404).render('error-404', {
        title: 'Page not found',
        layout: 'partials/base-layout'
    });
});

const writeRuntimePort = async (runtimePort: number) => {
    await mkdir(path.dirname(runtimePortFile), { recursive: true });
    await writeFile(runtimePortFile, JSON.stringify({ port: runtimePort, url: `http://localhost:${runtimePort}` }, null, 2), 'utf8');
};

const startServer = (candidatePort: number) => {
    const server = app.listen(candidatePort, async () => {
        const address = server.address();
        const runtimePort = typeof address === 'object' && address ? address.port : candidatePort;

        await writeRuntimePort(runtimePort);
        console.log(`Server running on port ${runtimePort}`);
        console.log(`http://localhost:${runtimePort}`);
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
        if (error.code === 'EADDRINUSE') {
            const nextPort = candidatePort + 1;
            console.warn(`Port ${candidatePort} is in use, trying ${nextPort}...`);
            server.close(() => startServer(nextPort));
            return;
        }

        throw error;
    });
};

startServer(port);

