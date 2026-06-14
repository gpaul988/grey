import db from '../db';
import bcrypt from 'bcryptjs';
import crypto from 'node:crypto';

const sha256 = (s: string) => crypto.createHash('sha256').update(s).digest('hex');

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  slug: string;
  sku: string | null;
  category_id: number | null;
  brand_id: number | null;
  description: string | null;
  specs: string; // JSON
  price: number;
  price_usd: number | null;
  compare_price: number | null;
  stock: number;
  images: string; // JSON
  thumbnail: string | null;
  status: 'draft' | 'active' | 'archived';
  featured: number;
  tags: string; // JSON
  weight: number | null;
  created_at: string;
  updated_at: string;
  // joined
  category_name?: string;
  category_slug?: string;
  brand_name?: string;
  brand_slug?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  icon: string | null;
  description: string | null;
  sort_order: number;
  created_at: string;
}

export interface ProductBrand {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
  description: string | null;
  created_at: string;
}

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string;
  bio: string | null;
  date_of_birth: string | null;
  gender: string | null;
  avatar: string | null;
  password_hash: string | null;
  email_verified: number;
  verified_at: string | null;
  last_login: string | null;
  status: 'active' | 'suspended';
  created_at: string;
  updated_at: string;
}

export type SafeCustomer = Omit<Customer, 'password_hash'>;

export interface Order {
  id: number;
  order_number: string;
  customer_id: number | null;
  customer_type: 'guest' | 'account';
  guest_name: string | null;
  guest_email: string | null;
  guest_phone: string | null;
  shipping_address: string;
  billing_address: string;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  payment_status: 'unpaid' | 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method: string | null;
  payment_gateway: string | null;
  payment_ref: string | null;
  payment_data: string;
  subtotal: number;
  shipping_fee: number;
  tax: number;
  discount: number;
  total: number;
  coupon_code: string | null;
  currency: string;
  notes: string | null;
  staff_notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number | null;
  product_name: string;
  product_image: string | null;
  product_sku: string | null;
  quantity: number;
  unit_price: number;
  total_price: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const generateOrderNumber = () => {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `GS-${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
};

// ─── Products ─────────────────────────────────────────────────────────────────

export const Products = {
  all(opts?: { status?: string; category_id?: number; brand_id?: number; featured?: boolean }): Product[] {
    let q = `SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
             FROM products p
             LEFT JOIN product_categories pc ON pc.id = p.category_id
             LEFT JOIN product_brands pb ON pb.id = p.brand_id
             WHERE 1=1`;
    const params: (string | number)[] = [];
    if (opts?.status) { q += ' AND p.status = ?'; params.push(opts.status); }
    if (opts?.category_id) { q += ' AND p.category_id = ?'; params.push(opts.category_id); }
    if (opts?.brand_id) { q += ' AND p.brand_id = ?'; params.push(opts.brand_id); }
    if (opts?.featured) { q += ' AND p.featured = 1'; }
    q += ' ORDER BY p.created_at DESC';
    return db.prepare(q).all(...params) as Product[];
  },

  find(id: number): Product | null {
    return (db.prepare(`SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
      FROM products p
      LEFT JOIN product_categories pc ON pc.id = p.category_id
      LEFT JOIN product_brands pb ON pb.id = p.brand_id
      WHERE p.id = ?`).get(id) as Product | undefined) ?? null;
  },

  findBySlug(slug: string): Product | null {
    return (db.prepare(`SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
      FROM products p
      LEFT JOIN product_categories pc ON pc.id = p.category_id
      LEFT JOIN product_brands pb ON pb.id = p.brand_id
      WHERE p.slug = ?`).get(slug) as Product | undefined) ?? null;
  },

  findMany(ids: number[]): Product[] {
    if (!ids.length) return [];
    const placeholders = ids.map(() => '?').join(',');
    return db.prepare(`SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
      FROM products p
      LEFT JOIN product_categories pc ON pc.id = p.category_id
      LEFT JOIN product_brands pb ON pb.id = p.brand_id
      WHERE p.id IN (${placeholders})`).all(...ids) as Product[];
  },

  count(): number {
    return (db.prepare('SELECT COUNT(*) AS c FROM products').get() as { c: number }).c;
  },

  create(data: {
    name: string; category_id?: number | null; brand_id?: number | null;
    description?: string; specs?: object; price: number; compare_price?: number | null;
    stock?: number; images?: string[]; thumbnail?: string; status?: string;
    featured?: boolean; tags?: string[]; weight?: number; sku?: string; price_usd?: number | null;
  }): Product {
    const slug = slugify(data.name) + '-' + Math.random().toString(36).slice(2, 6);
    const info = db.prepare(`
      INSERT INTO products (name, slug, sku, category_id, brand_id, description, specs, price, price_usd, compare_price, stock, images, thumbnail, status, featured, tags, weight)
      VALUES (@name, @slug, @sku, @category_id, @brand_id, @description, @specs, @price, @price_usd, @compare_price, @stock, @images, @thumbnail, @status, @featured, @tags, @weight)
    `).run({
      name: data.name,
      slug,
      sku: data.sku ?? null,
      category_id: data.category_id ?? null,
      brand_id: data.brand_id ?? null,
      description: data.description ?? null,
      specs: JSON.stringify(data.specs ?? {}),
      price: data.price,
      price_usd: data.price_usd ?? null,
      compare_price: data.compare_price ?? null,
      stock: data.stock ?? 0,
      images: JSON.stringify(data.images ?? []),
      thumbnail: data.thumbnail ?? null,
      status: data.status ?? 'draft',
      featured: data.featured ? 1 : 0,
      tags: JSON.stringify(data.tags ?? []),
      weight: data.weight ?? null,
    });
    return this.find(Number(info.lastInsertRowid))!;
  },

  update(id: number, data: Partial<{
    name: string; category_id: number | null; brand_id: number | null;
    description: string; specs: object; price: number; compare_price: number | null;
    stock: number; images: string[]; thumbnail: string; status: string;
    featured: boolean; tags: string[]; weight: number; sku: string; price_usd: number | null;
  }>): Product | null {
    const cur = this.find(id);
    if (!cur) return null;
    db.prepare(`
      UPDATE products SET
        name=@name, sku=@sku, category_id=@category_id, brand_id=@brand_id,
        description=@description, specs=@specs, price=@price, price_usd=@price_usd, compare_price=@compare_price,
        stock=@stock, images=@images, thumbnail=@thumbnail, status=@status,
        featured=@featured, tags=@tags, weight=@weight,
        updated_at=datetime('now')
      WHERE id=@id
    `).run({
      id,
      name: data.name ?? cur.name,
      sku: data.sku ?? cur.sku,
      category_id: data.category_id !== undefined ? data.category_id : cur.category_id,
      brand_id: data.brand_id !== undefined ? data.brand_id : cur.brand_id,
      description: data.description ?? cur.description,
      specs: data.specs ? JSON.stringify(data.specs) : cur.specs,
      price: data.price ?? cur.price,
      price_usd: data.price_usd !== undefined ? data.price_usd : cur.price_usd,
      compare_price: data.compare_price !== undefined ? data.compare_price : cur.compare_price,
      stock: data.stock !== undefined ? data.stock : cur.stock,
      images: data.images ? JSON.stringify(data.images) : cur.images,
      thumbnail: data.thumbnail ?? cur.thumbnail,
      status: data.status ?? cur.status,
      featured: data.featured !== undefined ? (data.featured ? 1 : 0) : cur.featured,
      tags: data.tags ? JSON.stringify(data.tags) : cur.tags,
      weight: data.weight !== undefined ? data.weight : cur.weight,
    });
    return this.find(id);
  },

  delete(id: number): void {
    db.prepare('DELETE FROM products WHERE id = ?').run(id);
  },

  search(q: string): Product[] {
    const like = `%${q}%`;
    return db.prepare(`
      SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
      FROM products p
      LEFT JOIN product_categories pc ON pc.id = p.category_id
      LEFT JOIN product_brands pb ON pb.id = p.brand_id
      WHERE p.name LIKE ? OR p.description LIKE ? OR p.sku LIKE ?
      ORDER BY p.name ASC LIMIT 50
    `).all(like, like, like) as Product[];
  },
};

// ─── Categories ──────────────────────────────────────────────────────────────

export const ProductCategories = {
  all(): ProductCategory[] {
    return db.prepare('SELECT * FROM product_categories ORDER BY sort_order ASC, name ASC').all() as ProductCategory[];
  },
  find(id: number): ProductCategory | null {
    return (db.prepare('SELECT * FROM product_categories WHERE id = ?').get(id) as ProductCategory | undefined) ?? null;
  },
  findBySlug(slug: string): ProductCategory | null {
    return (db.prepare('SELECT * FROM product_categories WHERE slug = ?').get(slug) as ProductCategory | undefined) ?? null;
  },
  create(data: { name: string; parent_id?: number | null; icon?: string; description?: string; sort_order?: number }): ProductCategory {
    const slug = slugify(data.name);
    const info = db.prepare(`INSERT INTO product_categories (name, slug, parent_id, icon, description, sort_order)
      VALUES (@name, @slug, @parent_id, @icon, @description, @sort_order)`).run({
      name: data.name, slug, parent_id: data.parent_id ?? null,
      icon: data.icon ?? null, description: data.description ?? null,
      sort_order: data.sort_order ?? 0,
    });
    return this.find(Number(info.lastInsertRowid))!;
  },
  update(id: number, data: Partial<{ name: string; parent_id: number | null; icon: string; description: string; sort_order: number }>): ProductCategory | null {
    const cur = this.find(id);
    if (!cur) return null;
    db.prepare(`UPDATE product_categories SET name=@name, parent_id=@parent_id, icon=@icon, description=@description, sort_order=@sort_order WHERE id=@id`).run({
      id, name: data.name ?? cur.name, parent_id: data.parent_id !== undefined ? data.parent_id : cur.parent_id,
      icon: data.icon ?? cur.icon, description: data.description ?? cur.description,
      sort_order: data.sort_order ?? cur.sort_order,
    });
    return this.find(id);
  },
  delete(id: number): void { db.prepare('DELETE FROM product_categories WHERE id = ?').run(id); },
};

// ─── Brands ──────────────────────────────────────────────────────────────────

export const ProductBrands = {
  all(): ProductBrand[] {
    return db.prepare('SELECT * FROM product_brands ORDER BY name ASC').all() as ProductBrand[];
  },
  find(id: number): ProductBrand | null {
    return (db.prepare('SELECT * FROM product_brands WHERE id = ?').get(id) as ProductBrand | undefined) ?? null;
  },
  findBySlug(slug: string): ProductBrand | null {
    return (db.prepare('SELECT * FROM product_brands WHERE slug = ?').get(slug) as ProductBrand | undefined) ?? null;
  },
  create(data: { name: string; logo?: string; description?: string }): ProductBrand {
    const slug = slugify(data.name);
    const info = db.prepare(`INSERT INTO product_brands (name, slug, logo, description) VALUES (@name, @slug, @logo, @description)`).run({
      name: data.name, slug, logo: data.logo ?? null, description: data.description ?? null,
    });
    return this.find(Number(info.lastInsertRowid))!;
  },
  update(id: number, data: Partial<{ name: string; logo: string; description: string }>): ProductBrand | null {
    const cur = this.find(id);
    if (!cur) return null;
    db.prepare(`UPDATE product_brands SET name=@name, logo=@logo, description=@description WHERE id=@id`).run({
      id, name: data.name ?? cur.name, logo: data.logo ?? cur.logo, description: data.description ?? cur.description,
    });
    return this.find(id);
  },
  delete(id: number): void { db.prepare('DELETE FROM product_brands WHERE id = ?').run(id); },
};

// ─── Customers ───────────────────────────────────────────────────────────────

export const Customers = {
  all(): SafeCustomer[] {
    return db.prepare('SELECT id,first_name,last_name,email,phone,address,city,state,country,bio,date_of_birth,gender,avatar,email_verified,verified_at,last_login,status,created_at,updated_at FROM customers ORDER BY created_at DESC').all() as SafeCustomer[];
  },
  count(): number {
    return (db.prepare('SELECT COUNT(*) AS c FROM customers').get() as { c: number }).c;
  },
  find(id: number): SafeCustomer | null {
    return (db.prepare('SELECT id,first_name,last_name,email,phone,address,city,state,country,bio,date_of_birth,gender,avatar,email_verified,verified_at,last_login,status,created_at,updated_at FROM customers WHERE id = ?').get(id) as SafeCustomer | undefined) ?? null;
  },
  findRaw(id: number): Customer | null {
    return (db.prepare('SELECT * FROM customers WHERE id = ?').get(id) as Customer | undefined) ?? null;
  },
  findByEmail(email: string): Customer | null {
    return (db.prepare('SELECT * FROM customers WHERE email = ?').get(email.toLowerCase()) as Customer | undefined) ?? null;
  },
  findByPhone(phone: string): SafeCustomer | null {
    return (db.prepare('SELECT id,first_name,last_name,email,phone,address,city,state,country,bio,date_of_birth,gender,avatar,email_verified,verified_at,last_login,status,created_at,updated_at FROM customers WHERE phone = ?').get(phone) as SafeCustomer | undefined) ?? null;
  },
  create(data: {
    first_name: string; last_name: string; phone: string;
    email?: string; address?: string; city?: string; state?: string;
    country?: string; bio?: string; date_of_birth?: string; gender?: string;
    password?: string;
  }): SafeCustomer {
    const hash = data.password ? bcrypt.hashSync(data.password, 12) : null;
    const info = db.prepare(`
      INSERT INTO customers (first_name,last_name,email,phone,address,city,state,country,bio,date_of_birth,gender,password_hash)
      VALUES (@first_name,@last_name,@email,@phone,@address,@city,@state,@country,@bio,@date_of_birth,@gender,@password_hash)
    `).run({
      first_name: data.first_name, last_name: data.last_name,
      email: data.email?.toLowerCase() ?? null, phone: data.phone,
      address: data.address ?? null, city: data.city ?? null,
      state: data.state ?? null, country: data.country ?? 'Nigeria',
      bio: data.bio ?? null, date_of_birth: data.date_of_birth ?? null,
      gender: data.gender ?? null, password_hash: hash,
    });
    return this.find(Number(info.lastInsertRowid))!;
  },
  update(id: number, data: Partial<{
    first_name: string; last_name: string; email: string; phone: string;
    address: string; city: string; state: string; country: string;
    bio: string; date_of_birth: string; gender: string; avatar: string; status: string;
  }>): SafeCustomer | null {
    const cur = this.findRaw(id);
    if (!cur) return null;
    db.prepare(`
      UPDATE customers SET first_name=@first_name, last_name=@last_name, email=@email, phone=@phone,
        address=@address, city=@city, state=@state, country=@country, bio=@bio,
        date_of_birth=@date_of_birth, gender=@gender, avatar=@avatar, status=@status,
        updated_at=datetime('now')
      WHERE id=@id
    `).run({
      id,
      first_name: data.first_name ?? cur.first_name,
      last_name: data.last_name ?? cur.last_name,
      email: data.email !== undefined ? (data.email?.toLowerCase() ?? null) : cur.email,
      phone: data.phone ?? cur.phone,
      address: data.address !== undefined ? data.address : cur.address,
      city: data.city !== undefined ? data.city : cur.city,
      state: data.state !== undefined ? data.state : cur.state,
      country: data.country ?? cur.country,
      bio: data.bio !== undefined ? data.bio : cur.bio,
      date_of_birth: data.date_of_birth !== undefined ? data.date_of_birth : cur.date_of_birth,
      gender: data.gender !== undefined ? data.gender : cur.gender,
      avatar: data.avatar !== undefined ? data.avatar : cur.avatar,
      status: data.status ?? cur.status,
    });
    return this.find(id);
  },
  async verifyPassword(email: string, password: string): Promise<Customer | null> {
    const row = this.findByEmail(email);
    if (!row || !row.password_hash) return null;
    const ok = await bcrypt.compare(password, row.password_hash);
    return ok ? row : null;
  },
  touchLogin(id: number): void {
    db.prepare("UPDATE customers SET last_login=datetime('now') WHERE id=?").run(id);
  },

  // ─── Password reset ────────────────────────────────────────────────────────
  /**
   * Create a single-use password reset token for the given email.
   * Returns the RAW token (to embed in the email link) and the customer, or
   * null if no account exists for that email. We store only a SHA-256 hash of
   * the token; any previous unused tokens for the customer are invalidated.
   * Token lifetime: 60 minutes.
   */
  createPasswordReset(email: string): { token: string; customer: SafeCustomer } | null {
    const row = this.findByEmail(email);
    if (!row) return null;
    // Invalidate prior unused tokens for this customer.
    db.prepare("UPDATE customer_password_resets SET used_at=datetime('now') WHERE customer_id=? AND used_at IS NULL").run(row.id);
    const token = crypto.randomBytes(32).toString('hex');
    db.prepare(
      "INSERT INTO customer_password_resets (customer_id, token_hash, expires_at) VALUES (?,?,datetime('now','+60 minutes'))",
    ).run(row.id, sha256(token));
    return { token, customer: this.find(row.id)! };
  },

  /** Validate a raw reset token. Returns the customer id if valid + unexpired + unused. */
  validateResetToken(token: string): number | null {
    if (!token) return null;
    const rec = db
      .prepare(
        "SELECT customer_id FROM customer_password_resets WHERE token_hash=? AND used_at IS NULL AND expires_at > datetime('now')",
      )
      .get(sha256(token)) as { customer_id: number } | undefined;
    return rec ? rec.customer_id : null;
  },

  /** Consume a reset token and set a new password. Returns true on success. */
  resetPassword(token: string, newPassword: string): boolean {
    const customerId = this.validateResetToken(token);
    if (!customerId) return false;
    const hash = bcrypt.hashSync(newPassword, 12);
    const tx = db.transaction(() => {
      db.prepare("UPDATE customers SET password_hash=?, updated_at=datetime('now') WHERE id=?").run(hash, customerId);
      db.prepare("UPDATE customer_password_resets SET used_at=datetime('now') WHERE token_hash=? AND used_at IS NULL").run(sha256(token));
    });
    tx();
    return true;
  },
};

// ─── Orders ──────────────────────────────────────────────────────────────────

export const Orders = {
  all(): Order[] {
    return db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all() as Order[];
  },
  count(): number {
    return (db.prepare('SELECT COUNT(*) AS c FROM orders').get() as { c: number }).c;
  },
  countByStatus(status: string): number {
    return (db.prepare('SELECT COUNT(*) AS c FROM orders WHERE status = ?').get(status) as { c: number }).c;
  },
  revenue(): number {
    return ((db.prepare("SELECT COALESCE(SUM(total),0) AS r FROM orders WHERE payment_status='paid'").get() as { r: number }).r);
  },
  find(id: number): Order | null {
    return (db.prepare('SELECT * FROM orders WHERE id = ?').get(id) as Order | undefined) ?? null;
  },
  findByNumber(orderNumber: string): Order | null {
    return (db.prepare('SELECT * FROM orders WHERE order_number = ?').get(orderNumber) as Order | undefined) ?? null;
  },
  itemsFor(orderId: number): OrderItem[] {
    return db.prepare('SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC').all(orderId) as OrderItem[];
  },
  forCustomer(customerId: number): Order[] {
    return db.prepare('SELECT * FROM orders WHERE customer_id = ? ORDER BY created_at DESC').all(customerId) as Order[];
  },
  create(data: {
    customer_id?: number | null; customer_type?: string;
    guest_name?: string; guest_email?: string; guest_phone?: string;
    shipping_address: object; billing_address?: object;
    subtotal: number; shipping_fee?: number; tax?: number; discount?: number; total: number;
    notes?: string; coupon_code?: string | null; currency?: string;
    items: { product_id?: number | null; product_name: string; product_image?: string; product_sku?: string; quantity: number; unit_price: number; total_price: number }[];
  }): Order {
    const order_number = generateOrderNumber();
    const info = db.prepare(`
      INSERT INTO orders (order_number, customer_id, customer_type, guest_name, guest_email, guest_phone,
        shipping_address, billing_address, subtotal, shipping_fee, tax, discount, total, notes, coupon_code, currency)
      VALUES (@order_number, @customer_id, @customer_type, @guest_name, @guest_email, @guest_phone,
        @shipping_address, @billing_address, @subtotal, @shipping_fee, @tax, @discount, @total, @notes, @coupon_code, @currency)
    `).run({
      order_number,
      customer_id: data.customer_id ?? null,
      customer_type: data.customer_type ?? 'guest',
      guest_name: data.guest_name ?? null,
      guest_email: data.guest_email ?? null,
      guest_phone: data.guest_phone ?? null,
      shipping_address: JSON.stringify(data.shipping_address),
      billing_address: JSON.stringify(data.billing_address ?? data.shipping_address),
      subtotal: data.subtotal,
      shipping_fee: data.shipping_fee ?? 0,
      tax: data.tax ?? 0,
      discount: data.discount ?? 0,
      total: data.total,
      notes: data.notes ?? null,
      coupon_code: data.coupon_code ?? null,
      currency: data.currency ?? 'NGN',
    });
    const orderId = Number(info.lastInsertRowid);
    const insertItem = db.prepare(`
      INSERT INTO order_items (order_id, product_id, product_name, product_image, product_sku, quantity, unit_price, total_price)
      VALUES (@order_id, @product_id, @product_name, @product_image, @product_sku, @quantity, @unit_price, @total_price)
    `);
    for (const item of data.items) {
      insertItem.run({ order_id: orderId, product_id: item.product_id ?? null, product_name: item.product_name, product_image: item.product_image ?? null, product_sku: item.product_sku ?? null, quantity: item.quantity, unit_price: item.unit_price, total_price: item.total_price });
    }
    return this.find(orderId)!;
  },
  updateStatus(id: number, status: string): void {
    db.prepare("UPDATE orders SET status=@status, updated_at=datetime('now') WHERE id=@id").run({ id, status });
  },
  updatePayment(id: number, data: { payment_status: string; payment_method?: string; payment_gateway?: string; payment_ref?: string; payment_data?: object }): void {
    db.prepare(`
      UPDATE orders SET payment_status=@payment_status, payment_method=@payment_method,
        payment_gateway=@payment_gateway, payment_ref=@payment_ref, payment_data=@payment_data,
        updated_at=datetime('now')
      WHERE id=@id
    `).run({
      id,
      payment_status: data.payment_status,
      payment_method: data.payment_method ?? null,
      payment_gateway: data.payment_gateway ?? null,
      payment_ref: data.payment_ref ?? null,
      payment_data: JSON.stringify(data.payment_data ?? {}),
    });
  },
  updateStaffNotes(id: number, notes: string): void {
    db.prepare("UPDATE orders SET staff_notes=@notes, updated_at=datetime('now') WHERE id=@id").run({ id, notes });
  },
  recent(limit = 10): Order[] {
    return db.prepare('SELECT * FROM orders ORDER BY created_at DESC LIMIT ?').all(limit) as Order[];
  },
};

// ─── Store Settings ──────────────────────────────────────────────────────────

export const StoreSettings = {
  get(key: string): string {
    const row = db.prepare('SELECT value FROM store_settings WHERE key = ?').get(key) as { value: string } | undefined;
    return row?.value ?? '';
  },
  set(key: string, value: string): void {
    db.prepare(`INSERT INTO store_settings (key, value, updated_at) VALUES (@key, @value, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at`).run({ key, value });
  },
  getAll(): Record<string, string> {
    const rows = db.prepare('SELECT key, value FROM store_settings').all() as { key: string; value: string }[];
    return Object.fromEntries(rows.map((r) => [r.key, r.value]));
  },
  setMany(data: Record<string, string>): void {
    const stmt = db.prepare(`INSERT INTO store_settings (key, value, updated_at) VALUES (@key, @value, datetime('now'))
      ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at`);
    for (const [key, value] of Object.entries(data)) {
      stmt.run({ key, value });
    }
  },
  // Returns only public (non-secret) gateway config for frontend
  publicGatewayConfig(): {
    paystack?: { enabled: boolean; public_key: string };
    flutterwave?: { enabled: boolean; public_key: string };
    monnify?: { enabled: boolean };
    bank_transfer?: { enabled: boolean; bank_name: string; account_number: string; account_name: string };
    currency: string;
    currency_symbol: string;
    shipping_fee: number;
  } {
    const s = this.getAll();
    return {
      currency: s['store.currency'] ?? 'NGN',
      currency_symbol: s['store.currency_symbol'] ?? '₦',
      shipping_fee: parseFloat(s['store.shipping_fee'] ?? '2500'),
      paystack: { enabled: s['payment.paystack.enabled'] === '1', public_key: s['payment.paystack.public_key'] ?? '' },
      flutterwave: { enabled: s['payment.flutterwave.enabled'] === '1', public_key: s['payment.flutterwave.public_key'] ?? '' },
      monnify: { enabled: s['payment.monnify.enabled'] === '1' },
      bank_transfer: {
        enabled: s['payment.bank_transfer.enabled'] === '1',
        bank_name: s['payment.bank_transfer.bank_name'] ?? '',
        account_number: s['payment.bank_transfer.account_number'] ?? '',
        account_name: s['payment.bank_transfer.account_name'] ?? '',
      },
    };
  },
};

// ─── Reviews ─────────────────────────────────────────────────────────────────

export const ProductReviews = {
  forProduct(productId: number, status?: string): unknown[] {
    if (status) {
      return db.prepare('SELECT * FROM product_reviews WHERE product_id = ? AND status = ? ORDER BY created_at DESC').all(productId, status);
    }
    return db.prepare('SELECT * FROM product_reviews WHERE product_id = ? ORDER BY created_at DESC').all(productId);
  },
  avgRating(productId: number): number {
    const row = db.prepare("SELECT AVG(rating) AS avg FROM product_reviews WHERE product_id = ? AND status = 'approved'").get(productId) as { avg: number | null };
    return Math.round((row.avg ?? 0) * 10) / 10;
  },
  create(data: { product_id: number; customer_id?: number; reviewer_name: string; rating: number; comment?: string }): void {
    db.prepare(`INSERT INTO product_reviews (product_id, customer_id, reviewer_name, rating, comment) VALUES (@product_id, @customer_id, @reviewer_name, @rating, @comment)`).run({
      product_id: data.product_id, customer_id: data.customer_id ?? null,
      reviewer_name: data.reviewer_name, rating: Math.min(5, Math.max(1, data.rating)),
      comment: data.comment ?? null,
    });
  },
  approve(id: number): void { db.prepare("UPDATE product_reviews SET status='approved' WHERE id=?").run(id); },
  reject(id: number): void { db.prepare("UPDATE product_reviews SET status='rejected' WHERE id=?").run(id); },
  all(status?: string): unknown[] {
    if (status) return db.prepare('SELECT r.*, p.name AS product_name FROM product_reviews r LEFT JOIN products p ON p.id = r.product_id WHERE r.status = ? ORDER BY r.created_at DESC').all(status);
    return db.prepare('SELECT r.*, p.name AS product_name FROM product_reviews r LEFT JOIN products p ON p.id = r.product_id ORDER BY r.created_at DESC').all();
  },
};

// ─── Coupons ─────────────────────────────────────────────────────────────────

export interface Coupon {
  id: number;
  code: string;
  type: 'percent' | 'fixed';
  value: number;
  min_subtotal: number;
  max_discount: number | null;
  usage_limit: number | null;
  used_count: number;
  starts_at: string | null;
  expires_at: string | null;
  status: 'active' | 'disabled';
  created_at: string;
}

export const Coupons = {
  all(): Coupon[] {
    return db.prepare('SELECT * FROM coupons ORDER BY created_at DESC').all() as Coupon[];
  },
  find(id: number): Coupon | null {
    return (db.prepare('SELECT * FROM coupons WHERE id = ?').get(id) as Coupon | undefined) ?? null;
  },
  findByCode(code: string): Coupon | null {
    return (db.prepare('SELECT * FROM coupons WHERE code = ? COLLATE NOCASE').get(code.trim()) as Coupon | undefined) ?? null;
  },
  create(data: {
    code: string; type?: string; value: number; min_subtotal?: number;
    max_discount?: number | null; usage_limit?: number | null; starts_at?: string | null;
    expires_at?: string | null; status?: string;
  }): Coupon {
    const info = db.prepare(`
      INSERT INTO coupons (code, type, value, min_subtotal, max_discount, usage_limit, starts_at, expires_at, status)
      VALUES (@code, @type, @value, @min_subtotal, @max_discount, @usage_limit, @starts_at, @expires_at, @status)
    `).run({
      code: data.code.trim().toUpperCase(),
      type: data.type ?? 'percent',
      value: data.value,
      min_subtotal: data.min_subtotal ?? 0,
      max_discount: data.max_discount ?? null,
      usage_limit: data.usage_limit ?? null,
      starts_at: data.starts_at ?? null,
      expires_at: data.expires_at ?? null,
      status: data.status ?? 'active',
    });
    return this.find(Number(info.lastInsertRowid))!;
  },
  update(id: number, data: Partial<{ code: string; type: string; value: number; min_subtotal: number; max_discount: number | null; usage_limit: number | null; starts_at: string | null; expires_at: string | null; status: string }>): Coupon | null {
    const cur = this.find(id);
    if (!cur) return null;
    db.prepare(`
      UPDATE coupons SET code=@code, type=@type, value=@value, min_subtotal=@min_subtotal,
        max_discount=@max_discount, usage_limit=@usage_limit, starts_at=@starts_at,
        expires_at=@expires_at, status=@status WHERE id=@id
    `).run({
      id,
      code: (data.code ?? cur.code).toUpperCase(),
      type: data.type ?? cur.type,
      value: data.value ?? cur.value,
      min_subtotal: data.min_subtotal ?? cur.min_subtotal,
      max_discount: data.max_discount !== undefined ? data.max_discount : cur.max_discount,
      usage_limit: data.usage_limit !== undefined ? data.usage_limit : cur.usage_limit,
      starts_at: data.starts_at !== undefined ? data.starts_at : cur.starts_at,
      expires_at: data.expires_at !== undefined ? data.expires_at : cur.expires_at,
      status: data.status ?? cur.status,
    });
    return this.find(id);
  },
  delete(id: number): void { db.prepare('DELETE FROM coupons WHERE id = ?').run(id); },
  incrementUsage(code: string): void {
    db.prepare('UPDATE coupons SET used_count = used_count + 1 WHERE code = ? COLLATE NOCASE').run(code);
  },
  // Validate a coupon for a given subtotal. Returns { valid, discount, reason }
  validate(code: string, subtotal: number): { valid: boolean; discount: number; reason?: string; coupon?: Coupon } {
    const c = this.findByCode(code);
    if (!c) return { valid: false, discount: 0, reason: 'Invalid coupon code' };
    if (c.status !== 'active') return { valid: false, discount: 0, reason: 'Coupon is not active' };
    const now = new Date();
    if (c.starts_at && new Date(c.starts_at) > now) return { valid: false, discount: 0, reason: 'Coupon not yet active' };
    if (c.expires_at && new Date(c.expires_at) < now) return { valid: false, discount: 0, reason: 'Coupon has expired' };
    if (c.usage_limit !== null && c.used_count >= c.usage_limit) return { valid: false, discount: 0, reason: 'Coupon usage limit reached' };
    if (subtotal < c.min_subtotal) return { valid: false, discount: 0, reason: `Minimum order of ${c.min_subtotal} required` };
    let discount = c.type === 'percent' ? Math.round(subtotal * (c.value / 100)) : c.value;
    if (c.max_discount !== null && discount > c.max_discount) discount = c.max_discount;
    if (discount > subtotal) discount = subtotal;
    return { valid: true, discount, coupon: c };
  },
};

// ─── Wishlists ────────────────────────────────────────────────────────────────

export interface WishlistRow {
  id: number;
  customer_id: number;
  product_id: number;
  created_at: string;
}

export const Wishlists = {
  forCustomer(customerId: number): Product[] {
    return db.prepare(`
      SELECT p.*, pc.name AS category_name, pc.slug AS category_slug, pb.name AS brand_name, pb.slug AS brand_slug
      FROM wishlists w
      JOIN products p ON p.id = w.product_id
      LEFT JOIN product_categories pc ON pc.id = p.category_id
      LEFT JOIN product_brands pb ON pb.id = p.brand_id
      WHERE w.customer_id = ?
      ORDER BY w.created_at DESC
    `).all(customerId) as Product[];
  },
  ids(customerId: number): number[] {
    return (db.prepare('SELECT product_id FROM wishlists WHERE customer_id = ?').all(customerId) as { product_id: number }[]).map((r) => r.product_id);
  },
  has(customerId: number, productId: number): boolean {
    return !!db.prepare('SELECT 1 FROM wishlists WHERE customer_id = ? AND product_id = ?').get(customerId, productId);
  },
  add(customerId: number, productId: number): void {
    db.prepare('INSERT OR IGNORE INTO wishlists (customer_id, product_id) VALUES (?, ?)').run(customerId, productId);
  },
  remove(customerId: number, productId: number): void {
    db.prepare('DELETE FROM wishlists WHERE customer_id = ? AND product_id = ?').run(customerId, productId);
  },
  toggle(customerId: number, productId: number): boolean {
    if (this.has(customerId, productId)) { this.remove(customerId, productId); return false; }
    this.add(customerId, productId); return true;
  },
};
