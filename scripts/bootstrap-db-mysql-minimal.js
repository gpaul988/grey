#!/usr/bin/env node
/**
 * Minimal bootstrap-db-mysql-minimal.js
 * Creates a small set of core tables required for seeding: users, clients, submissions, faqs
 * Uses env: DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT
 */

const mysql = require('mysql2/promise');

async function main() {
  const host = process.env.DB_HOST || '127.0.0.1';
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASS || '';
  const database = process.env.DB_NAME || 'grey';
  const port = Number(process.env.DB_PORT || 3306);

  const adminConn = await mysql.createConnection({ host, user, password, port });
  await adminConn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await adminConn.end();

  const pool = mysql.createPool({ host, user, password, database, port, waitForConnections: true, connectionLimit: 5 });
  const conn = await pool.getConnection();
  console.log('[bootstrap:mysql:minimal] Connected to', `${user}@${host}:${port}/${database}`);

  const stmts = [
    `CREATE TABLE IF NOT EXISTS users (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(191) NOT NULL UNIQUE,
      password_hash VARCHAR(255),
      role VARCHAR(50) NOT NULL DEFAULT 'staff',
      avatar VARCHAR(255),
      phone VARCHAR(64),
      status VARCHAR(50) NOT NULL DEFAULT 'active',
      email_verified TINYINT NOT NULL DEFAULT 0,
      verified_at DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS clients (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(191) NOT NULL UNIQUE,
      company VARCHAR(255),
      phone VARCHAR(64),
      password_hash VARCHAR(255),
      status VARCHAR(50) NOT NULL DEFAULT 'active',
      last_login DATETIME NULL,
      email_verified TINYINT NOT NULL DEFAULT 0,
      verified_at DATETIME NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS submissions (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(191) NOT NULL,
      phone VARCHAR(64),
      subject VARCHAR(255),
      project_type VARCHAR(255),
      budget VARCHAR(255),
      message TEXT,
      source VARCHAR(50) NOT NULL DEFAULT 'website',
      status VARCHAR(50) NOT NULL DEFAULT 'new',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS faqs (
      id INT PRIMARY KEY AUTO_INCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category VARCHAR(255) NOT NULL DEFAULT 'General',
      sort_order INT NOT NULL DEFAULT 0,
      active TINYINT NOT NULL DEFAULT 1,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS notifications (
      id INT PRIMARY KEY AUTO_INCREMENT,
      type VARCHAR(50) NOT NULL,
      title VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      entity_type VARCHAR(50),
      entity_id INT,
      related_data TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'unread',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS leads (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(191) NOT NULL,
      company VARCHAR(255),
      phone VARCHAR(64),
      source VARCHAR(100) NOT NULL DEFAULT 'website',
      stage VARCHAR(50) NOT NULL DEFAULT 'new',
      value DECIMAL(10,2) NOT NULL DEFAULT 0,
      owner_id INT NULL,
      notes TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS projects (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      client_id INT NULL,
      client_name VARCHAR(255),
      status VARCHAR(50) NOT NULL DEFAULT 'planning',
      progress INT NOT NULL DEFAULT 0,
      budget DECIMAL(10,2) NOT NULL DEFAULT 0,
      start_date VARCHAR(50),
      end_date VARCHAR(50),
      description TEXT,
      manager_id INT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS tickets (
      id INT PRIMARY KEY AUTO_INCREMENT,
      subject VARCHAR(255) NOT NULL,
      requester VARCHAR(255) NOT NULL,
      requester_email VARCHAR(191),
      priority VARCHAR(50) NOT NULL DEFAULT 'medium',
      status VARCHAR(50) NOT NULL DEFAULT 'open',
      assignee_id INT NULL,
      body TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS ticket_messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      ticket_id INT NOT NULL,
      author VARCHAR(255) NOT NULL,
      is_staff TINYINT NOT NULL DEFAULT 1,
      body TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS invoices (
      id INT PRIMARY KEY AUTO_INCREMENT,
      number VARCHAR(191) NOT NULL UNIQUE,
      client_id INT NULL,
      client_name VARCHAR(255) NOT NULL,
      client_email VARCHAR(191),
      amount DECIMAL(10,2) NOT NULL DEFAULT 0,
      tax DECIMAL(10,2) NOT NULL DEFAULT 0,
      total DECIMAL(10,2) NOT NULL DEFAULT 0,
      currency VARCHAR(50) NOT NULL DEFAULT 'USD',
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      issued_date VARCHAR(50),
      due_date VARCHAR(50),
      items TEXT,
      notes TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS case_studies (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      client VARCHAR(255),
      industry VARCHAR(255),
      summary TEXT,
      body TEXT,
      image VARCHAR(255),
      results TEXT,
      published TINYINT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS blog_posts (
      id INT PRIMARY KEY AUTO_INCREMENT,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      excerpt TEXT,
      body TEXT,
      cover VARCHAR(255),
      author VARCHAR(255) NOT NULL DEFAULT 'Grey InfoTech',
      tags TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      published_at VARCHAR(50),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS conversations (
      id INT PRIMARY KEY AUTO_INCREMENT,
      client_id INT NULL,
      subject VARCHAR(255),
      last_message TEXT,
      unread INT NOT NULL DEFAULT 0,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      project_id INT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS messages (
      id INT PRIMARY KEY AUTO_INCREMENT,
      conversation_id INT NOT NULL,
      sender VARCHAR(50) NOT NULL,
      sender_name VARCHAR(255),
      body TEXT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS activity_log (
      id INT PRIMARY KEY AUTO_INCREMENT,
      user_id INT NULL,
      user_name VARCHAR(255),
      action VARCHAR(255) NOT NULL,
      entity VARCHAR(255),
      entity_id INT,
      detail TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS product_categories (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      parent_id INT NULL,
      icon VARCHAR(255),
      description TEXT,
      sort_order INT NOT NULL DEFAULT 0,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS product_brands (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      logo VARCHAR(255),
      description TEXT,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(255) NOT NULL,
      slug VARCHAR(191) NOT NULL UNIQUE,
      sku VARCHAR(255) UNIQUE,
      category_id INT NULL,
      brand_id INT NULL,
      description TEXT,
      specs TEXT,
      price DECIMAL(10,2) NOT NULL DEFAULT 0,
      compare_price DECIMAL(10,2),
      stock INT NOT NULL DEFAULT 0,
      images TEXT,
      thumbnail VARCHAR(255),
      status VARCHAR(50) NOT NULL DEFAULT 'draft',
      featured TINYINT NOT NULL DEFAULT 0,
      tags TEXT,
      weight DECIMAL(10,2),
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS product_reviews (
      id INT PRIMARY KEY AUTO_INCREMENT,
      product_id INT NOT NULL,
      reviewer_name VARCHAR(255),
      rating INT NOT NULL DEFAULT 5,
      comment TEXT,
      status VARCHAR(50) NOT NULL DEFAULT 'pending',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS coupons (
      id INT PRIMARY KEY AUTO_INCREMENT,
      code VARCHAR(191) NOT NULL UNIQUE,
      type VARCHAR(50) NOT NULL,
      value DECIMAL(10,2) NOT NULL,
      min_subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
      max_discount DECIMAL(10,2),
      usage_limit INT,
      status VARCHAR(50) NOT NULL DEFAULT 'active',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS store_settings (
      id INT PRIMARY KEY AUTO_INCREMENT,
      \`key\` VARCHAR(255) NOT NULL UNIQUE,
      \`value\` VARCHAR(3000) NOT NULL DEFAULT '',
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`,

    `CREATE TABLE IF NOT EXISTS wishlists (
      id INT PRIMARY KEY AUTO_INCREMENT,
      customer_id INT NOT NULL,
      product_id INT NOT NULL,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`
  ];

  for (const s of stmts) {
    await conn.query(s);
  }
  console.log('[bootstrap:mysql:minimal] Core tables created/verified');

  await conn.release();
  await pool.end();
  console.log('[bootstrap:mysql:minimal] ✅ Done');
}

main().catch(err => {
  if (err && err.code === 'ER_ACCESS_DENIED_ERROR') {
    console.error('[bootstrap:mysql:minimal] Access denied. Set DB_HOST, DB_USER, DB_PASS, DB_NAME, and DB_PORT for your MySQL server.');
  }
  console.error('bootstrap:mysql:minimal failed:', err);
  process.exit(1);
});
