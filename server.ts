import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import next from 'next';
import path from 'node:path';
import { parse } from 'node:url';

import { ADMIN_BASE_PATH } from './Admin/config/adminPaths';
import { ensureAuth } from './Admin/middleware/authMiddleware';
import adminRoutes from './Admin/routes/admin';
import authRoutes from './Admin/routes/auth';

dotenv.config({ path: './config.env' });

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || 'localhost';
const port = Number(process.env.PORT || 3000);
const adminPublicPath = path.join(process.cwd(), 'Admin', 'public');
const adminViewsPath = path.join(process.cwd(), 'Admin', 'views');

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

const app = express();

app.set('views', adminViewsPath);
app.set('view engine', 'ejs');
app.set('layout', 'partials/layout-vertical');

app.use(expressLayouts);

// Serve legacy admin assets so existing EJS templates keep working.
app.use('/css', express.static(path.join(adminPublicPath, 'css')));
app.use('/js', express.static(path.join(adminPublicPath, 'js')));
app.use('/images', express.static(path.join(adminPublicPath, 'images')));
app.use('/vendor', express.static(path.join(adminPublicPath, 'vendor')));
app.use('/fonts', express.static(path.join(adminPublicPath, 'fonts')));

app.use(ADMIN_BASE_PATH, express.urlencoded({ extended: true }));
app.use(ADMIN_BASE_PATH, express.json());
app.use(ADMIN_BASE_PATH, cookieParser());
app.use(
  ADMIN_BASE_PATH,
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET || 'grey-admin-session',
    cookie: { httpOnly: true, sameSite: 'lax' }
  })
);

app.use(ADMIN_BASE_PATH, (req, res, nextMiddleware) => {
  res.locals.user = req.session.user || null;
  res.locals.currentYear = new Date().getFullYear();
  res.locals.frontendBaseUrl = process.env.FRONTEND_BASE_URL || '/';
  res.locals.backendBaseUrl = process.env.BACKEND_BASE_URL || `${ADMIN_BASE_PATH}`;
  res.locals.adminBasePath = ADMIN_BASE_PATH;
  nextMiddleware();
});

app.use(ADMIN_BASE_PATH, authRoutes);
app.use(ADMIN_BASE_PATH, ensureAuth, adminRoutes);

nextApp.prepare().then(() => {
  app.all('*', async (req, res) => {
    try {
      const parsedUrl = parse(req.url || '', true);
      await handle(req, res, parsedUrl);
    } catch (error) {
      console.error('Error handling request:', req.url, error);
      res.status(500).send('internal server error');
    }
  });

  app.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Admin on http://${hostname}:${port}${ADMIN_BASE_PATH}`);
  });
});

