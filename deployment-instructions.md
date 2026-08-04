# CPANEL DEPLOYMENT INSTRUCTIONS
## Grey Project - Production Deployment

### Pre-Deployment Checklist
- [x] Production build created and tested
- [x] All code committed to git
- [x] Deployment package (ZIP) created
- [ ] cPanel database created
- [ ] .env.local updated with cPanel credentials
- [ ] Node.js enabled in cPanel

### Database Setup
1. Create MySQL database in cPanel:
   - Database name: grey_db
   - User: grey_user
   - Password: [strong password]

2. Update .env.local with:
   `
   DB_HOST=localhost
   DB_USER=grey_user
   DB_PASSWORD=[password]
   DB_NAME=grey_db
   DB_TYPE=mysql
   DB_PORT=3306
   `

### Upload & Extract Steps
1. Login to cPanel -> File Manager
2. Navigate to public_html (or subdirectory)
3. Upload grey-production-YYYY-MM-DD_HHMM.zip
4. Right-click -> Extract
5. This creates a 'deployment' folder
6. Move contents up one level if needed

### Install Dependencies
`ash
# SSH into your cPanel account
cd /home/username/public_html

# Install Node dependencies
npm install --production

# If needed, rebuild
npm run build
`

### Create Node.js Application in cPanel
1. Go to cPanel -> Setup Node.js App
2. Create new application:
   - Node.js version: 20.x (latest)
   - Application mode: Production
   - Application startup file: node_modules/.bin/next start
   - Application port: 3000
   - Application root: /home/username/public_html

### Verify Deployment
1. Check application is running: Visit your domain
2. Admin dashboard: https://yourdomain.com/admin
3. Store pages: https://yourdomain.com/store
4. API endpoints: https://yourdomain.com/api/store/products

### Troubleshooting
If app won't start:
- Check Node.js version: node -v (should be 20.x+)
- Check npm packages: npm list
- Check .env.local exists and has correct values
- Check database connection: mysql -h localhost -u grey_user -p
- View logs in cPanel -> Node.js App status

### Database Migration (if needed)
The app uses Drizzle ORM. If schema needs updating:
`ash
npm run db:push  # If migrations exist
`

### Support
- Repository: https://github.com/gpaul988/grey
- Branch: fix/db-default-sqlite
- Latest commit: afe196cf
