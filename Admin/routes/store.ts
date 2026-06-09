import express, { type Request, type Response } from 'express';
import db from '../db';
import { requirePermission } from '../middleware/authMiddleware';
import {
    Products, ProductCategories, ProductBrands, Customers, Orders, StoreSettings,
    Coupons, logActivity,
} from '../models';
import { formatMoney, timeAgo, toInt } from '../utils/helpers';
import { productUpload, publicUrl } from '../config/uploads';

const route = express.Router();
const baseLocals = { fmtMoney: formatMoney, timeAgo };

const actor = (req: Request) => ({ user_id: req.session.user?.id ?? null, user_name: req.session.user?.name ?? null });
const parseTags = (s: string): string[] => (s || '').split(',').map((t) => t.trim()).filter(Boolean);

// ─── Products ────────────────────────────────────────────────────────────────

route.get('/products', requirePermission('store.view'), (_req, res) => {
    res.render('store-products', { title: 'Products', ...baseLocals, products: Products.all() });
});

route.get('/products/new', requirePermission('store.manage'), (_req, res) => {
    res.render('store-product-form', {
        title: 'New Product', ...baseLocals, product: null,
        categories: ProductCategories.all(), brands: ProductBrands.all(),
    });
});

route.post('/products/new', requirePermission('store.manage'), (req: Request, res: Response) => {
    productUpload.array('product_images', 8)(req, res, () => {
        const files = (req.files as { filename: string }[]) || [];
        const images = files.map((f) => publicUrl('products', f.filename));
        const specs: Record<string, string> = {};
        const keys = ([] as string[]).concat(req.body.spec_key || []);
        const vals = ([] as string[]).concat(req.body.spec_val || []);
        keys.forEach((k, i) => { if (k && k.trim()) specs[k.trim()] = (vals[i] || '').trim(); });

        const product = Products.create({
            name: req.body.name,
            sku: req.body.sku || undefined,
            category_id: req.body.category_id ? toInt(req.body.category_id) : null,
            brand_id: req.body.brand_id ? toInt(req.body.brand_id) : null,
            description: req.body.description || '',
            specs,
            price: parseFloat(req.body.price) || 0,
            price_usd: req.body.price_usd ? parseFloat(req.body.price_usd) : null,
            compare_price: req.body.compare_price ? parseFloat(req.body.compare_price) : null,
            stock: parseInt(req.body.stock, 10) || 0,
            images,
            thumbnail: images[0] || undefined,
            status: req.body.status || 'draft',
            featured: req.body.featured === '1',
            tags: parseTags(req.body.tags),
            weight: req.body.weight ? parseFloat(req.body.weight) : undefined,
        });
        logActivity({ ...actor(req), action: 'create', entity: 'product', entity_id: product.id, detail: product.name });
        res.redirect('/admin/store/products');
    });
});

route.get('/products/:id/edit', requirePermission('store.manage'), (req, res) => {
    const product = Products.find(toInt(req.params.id));
    if (!product) return res.redirect('/admin/store/products');
    res.render('store-product-form', {
        title: 'Edit Product', ...baseLocals, product,
        categories: ProductCategories.all(), brands: ProductBrands.all(),
    });
});

route.post('/products/:id/edit', requirePermission('store.manage'), (req: Request, res: Response) => {
    productUpload.array('product_images', 8)(req, res, () => {
        const id = toInt(req.params.id);
        const files = (req.files as { filename: string }[]) || [];
        const newImages = files.map((f) => publicUrl('products', f.filename));
        const existing = ([] as string[]).concat(req.body.existing_images || []);
        const images = [...existing, ...newImages];

        const specs: Record<string, string> = {};
        const keys = ([] as string[]).concat(req.body.spec_key || []);
        const vals = ([] as string[]).concat(req.body.spec_val || []);
        keys.forEach((k, i) => { if (k && k.trim()) specs[k.trim()] = (vals[i] || '').trim(); });

        Products.update(id, {
            name: req.body.name,
            sku: req.body.sku || undefined,
            category_id: req.body.category_id ? toInt(req.body.category_id) : null,
            brand_id: req.body.brand_id ? toInt(req.body.brand_id) : null,
            description: req.body.description || '',
            specs,
            price: parseFloat(req.body.price) || 0,
            price_usd: req.body.price_usd ? parseFloat(req.body.price_usd) : null,
            compare_price: req.body.compare_price ? parseFloat(req.body.compare_price) : null,
            stock: parseInt(req.body.stock, 10) || 0,
            images,
            thumbnail: images[0],
            status: req.body.status || 'draft',
            featured: req.body.featured === '1',
            tags: parseTags(req.body.tags),
            weight: req.body.weight ? parseFloat(req.body.weight) : undefined,
        });
        logActivity({ ...actor(req), action: 'update', entity: 'product', entity_id: id, detail: req.body.name });
        res.redirect('/admin/store/products');
    });
});

// ─── Orders ──────────────────────────────────────────────────────────────────

route.get('/orders', requirePermission('store.view'), (_req, res) => {
    const orders = Orders.all().map((o) => {
        const itemCount = (db.prepare('SELECT COUNT(*) AS c FROM order_items WHERE order_id = ?').get(o.id) as { c: number }).c;
        let customer_name = '';
        if (o.customer_id) {
            const c = Customers.find(o.customer_id);
            customer_name = c ? `${c.first_name} ${c.last_name}` : '';
        }
        return { ...o, item_count: itemCount, customer_name };
    });
    const stats = {
        total: Orders.count(),
        pending: Orders.countByStatus('pending'),
        delivered: Orders.countByStatus('delivered'),
        revenue: Orders.revenue(),
    };
    res.render('store-orders', { title: 'Orders', ...baseLocals, orders, stats });
});

route.get('/orders/:id', requirePermission('store.view'), (req, res) => {
    const order = Orders.find(toInt(req.params.id));
    if (!order) return res.redirect('/admin/store/orders');
    const items = Orders.itemsFor(order.id);
    const customer = order.customer_id ? Customers.find(order.customer_id) : null;
    res.render('store-order-detail', { title: `Order #${order.order_number}`, ...baseLocals, order, items, customer });
});

// ─── Customers ───────────────────────────────────────────────────────────────

route.get('/customers', requirePermission('store.view'), (_req, res) => {
    const customers = Customers.all().map((c) => {
        const orderCount = (db.prepare('SELECT COUNT(*) AS c FROM orders WHERE customer_id = ?').get(c.id) as { c: number }).c;
        return { ...c, order_count: orderCount };
    });
    res.render('store-customers', { title: 'Customers', ...baseLocals, customers });
});

route.get('/customers/:id', requirePermission('store.view'), (req, res) => {
    const customer = Customers.find(toInt(req.params.id));
    if (!customer) return res.redirect('/admin/store/customers');
    const orders = Orders.forCustomer(customer.id);
    res.render('store-customer-profile', { title: `${customer.first_name} ${customer.last_name}`, ...baseLocals, customer, orders });
});

// ─── Categories ──────────────────────────────────────────────────────────────

route.get('/categories', requirePermission('store.view'), (_req, res) => {
    const categories = ProductCategories.all().map((c) => {
        const pc = (db.prepare('SELECT COUNT(*) AS c FROM products WHERE category_id = ?').get(c.id) as { c: number }).c;
        return { ...c, product_count: pc };
    });
    res.render('store-categories', { title: 'Categories', ...baseLocals, categories });
});

route.post('/categories', requirePermission('store.manage'), (req, res) => {
    ProductCategories.create({
        name: req.body.name,
        parent_id: req.body.parent_id ? toInt(req.body.parent_id) : null,
        icon: req.body.icon || undefined,
        description: req.body.description || undefined,
    });
    logActivity({ ...actor(req), action: 'create', entity: 'category', detail: req.body.name });
    res.redirect('/admin/store/categories');
});

// ─── Brands ──────────────────────────────────────────────────────────────────

route.get('/brands', requirePermission('store.view'), (_req, res) => {
    const brands = ProductBrands.all().map((b) => {
        const pc = (db.prepare('SELECT COUNT(*) AS c FROM products WHERE brand_id = ?').get(b.id) as { c: number }).c;
        return { ...b, product_count: pc };
    });
    res.render('store-brands', { title: 'Brands', ...baseLocals, brands });
});

route.post('/brands', requirePermission('store.manage'), (req: Request, res: Response) => {
    productUpload.single('logo')(req, res, () => {
        const file = (req as Request & { file?: { filename: string } }).file;
        const logo = file ? publicUrl('products', file.filename) : undefined;
        ProductBrands.create({ name: req.body.name, logo, description: req.body.description || undefined });
        logActivity({ ...actor(req), action: 'create', entity: 'brand', detail: req.body.name });
        res.redirect('/admin/store/brands');
    });
});

// ─── Settings ────────────────────────────────────────────────────────────────

route.get('/settings', requirePermission('store.view'), (req, res) => {
    res.render('store-settings', { title: 'Store Settings', ...baseLocals, s: StoreSettings.getAll(), isSuperadmin: req.session.user?.role === 'superadmin' });
});

route.post('/settings', requirePermission('store.manage'), (req, res) => {
    const isSuperadmin = req.session.user?.role === 'superadmin';
    const body = req.body as Record<string, string>;
    const updates: Record<string, string> = {};

    // General store settings (any store manager)
    ['store.name', 'store.currency', 'store.currency_symbol', 'store.shipping_fee', 'store.tax_rate', 'store.usd_rate'].forEach((k) => {
        if (k in body) updates[k] = body[k];
    });
    // USD multi-currency toggle
    if ('store.usd_section' in body) {
        updates['store.usd_enabled'] = body['store.usd_enabled'] === '1' ? '1' : '0';
    }

    // Payment gateway settings — superadmin only
    if (isSuperadmin) {
        const gatewayKeys = [
            'payment.paystack.public_key', 'payment.paystack.secret_key',
            'payment.flutterwave.public_key', 'payment.flutterwave.secret_key', 'payment.flutterwave.webhook_hash',
            'payment.monnify.api_key', 'payment.monnify.secret_key', 'payment.monnify.contract_code', 'payment.monnify.base_url',
            'payment.bank_transfer.bank_name', 'payment.bank_transfer.account_number', 'payment.bank_transfer.account_name',
        ];
        gatewayKeys.forEach((k) => { if (k in body) updates[k] = body[k]; });
        // Toggle switches — checkboxes only present when checked
        ['payment.paystack.enabled', 'payment.flutterwave.enabled', 'payment.monnify.enabled', 'payment.bank_transfer.enabled'].forEach((k) => {
            updates[k] = body[k] === '1' ? '1' : '0';
        });
    }

    StoreSettings.setMany(updates);
    logActivity({ ...actor(req), action: 'update', entity: 'store_settings' });
    res.redirect('/admin/store/settings');
});

// ─── Coupons CRUD ─────────────────────────────────────────────────────────────

route.get('/coupons', requirePermission('store.view'), (_req, res) => {
    res.render('store-coupons', { title: 'Coupons & Discounts', ...baseLocals, coupons: Coupons.all() });
});

route.post('/coupons', requirePermission('store.manage'), (req, res) => {
    Coupons.create({
        code: req.body.code,
        type: req.body.type || 'percent',
        value: parseFloat(req.body.value) || 0,
        min_subtotal: req.body.min_subtotal ? parseFloat(req.body.min_subtotal) : 0,
        max_discount: req.body.max_discount ? parseFloat(req.body.max_discount) : null,
        usage_limit: req.body.usage_limit ? parseInt(req.body.usage_limit, 10) : null,
        starts_at: req.body.starts_at || null,
        expires_at: req.body.expires_at || null,
        status: req.body.status || 'active',
    });
    logActivity({ ...actor(req), action: 'create', entity: 'coupon', detail: req.body.code });
    res.redirect('/admin/store/coupons');
});

route.post('/coupons/:id/edit', requirePermission('store.manage'), (req, res) => {
    const id = toInt(req.params.id);
    Coupons.update(id, {
        code: req.body.code,
        type: req.body.type,
        value: parseFloat(req.body.value) || 0,
        min_subtotal: req.body.min_subtotal ? parseFloat(req.body.min_subtotal) : 0,
        max_discount: req.body.max_discount ? parseFloat(req.body.max_discount) : null,
        usage_limit: req.body.usage_limit ? parseInt(req.body.usage_limit, 10) : null,
        starts_at: req.body.starts_at || null,
        expires_at: req.body.expires_at || null,
        status: req.body.status,
    });
    logActivity({ ...actor(req), action: 'update', entity: 'coupon', entity_id: id, detail: req.body.code });
    res.redirect('/admin/store/coupons');
});

route.post('/coupons/:id/delete', requirePermission('store.manage'), (req, res) => {
    Coupons.delete(toInt(req.params.id));
    logActivity({ ...actor(req), action: 'delete', entity: 'coupon', entity_id: toInt(req.params.id) });
    res.redirect('/admin/store/coupons');
});

export default route;
