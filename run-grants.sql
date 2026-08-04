-- Run as a MySQL administrative user (root) to create DB and grant access
-- Replace passwords/names as needed.

CREATE DATABASE IF NOT EXISTS `greyinf1_Grey_InfoTech` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'greyinf1_greyinfotech'@'localhost' IDENTIFIED BY '1@Uriel2$Sobiribo2,&';
CREATE USER IF NOT EXISTS 'greyinf1_greyinfotech'@'127.0.0.1' IDENTIFIED BY '1@Uriel2$Sobiribo2,&';
-- If remote access required, add: CREATE USER IF NOT EXISTS 'greyinf1_greyinfotech'@'%' IDENTIFIED BY 'PASSWORD';

GRANT ALL PRIVILEGES ON `greyinf1_Grey_InfoTech`.* TO 'greyinf1_greyinfotech'@'localhost';
GRANT ALL PRIVILEGES ON `greyinf1_Grey_InfoTech`.* TO 'greyinf1_greyinfotech'@'127.0.0.1';
-- GRANT ALL PRIVILEGES ON `greyinf1_Grey_InfoTech`.* TO 'greyinf1_greyinfotech'@'%';

FLUSH PRIVILEGES;

-- After running the above, from the project root run:
-- npm run bootstrap:db:mysql
-- npm run seed
-- Then restart the app and test: curl http://localhost:3000/api/store/products
