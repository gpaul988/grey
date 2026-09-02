import db from '@/Admin/db';

export type AdminKpi = {
  label: string;
  value: string;
  delta: string;
  detail: string;
  tone: 'sky' | 'emerald' | 'violet' | 'amber' | 'rose';
};

export type DashboardSummary = {
  kpis: AdminKpi[];
  revenueSeries: Array<{ label: string; revenue: number; orders: number }>;
  orderStatus: Array<{ name: string; value: number; color: string }>;
  recentOrders: Array<{ id: number; orderNumber: string; customer: string; total: number; status: string; createdAt: string }>;
  lowStock: Array<{ id: number; name: string; stock: number; sku: string; status: string }>;
  recentActivity: Array<{ id: number; action: string; actor: string; entity: string; createdAt: string }>;
  topProducts: Array<{ id: number; name: string; sold: number; revenue: number; stock: number }>;
};

const formatMoney = (amount: number) =>
  new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    maximumFractionDigits: 0,
  }).format(amount);

function getRowCount(q: string, params: unknown[] = []) {
  const row = db.prepare(q).get(...params) as { c?: number } | undefined;
  return Number(row?.c ?? 0);
}

export async function getAdminDashboardSummary(): Promise<DashboardSummary> {
  const totalOrders = getRowCount('SELECT COUNT(*) AS c FROM orders');
  const paidRevenue = Number(
    (db.prepare('SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE payment_status = ?').get('paid') as { total?: number } | undefined)?.total ?? 0,
  );
  const monthlyRevenue = Number(
    (db.prepare('SELECT COALESCE(SUM(total), 0) AS total FROM orders WHERE payment_status = ? AND created_at >= datetime("now", "-30 days")').get('paid') as { total?: number } | undefined)?.total ?? 0,
  );
  const totalCustomers = getRowCount('SELECT COUNT(*) AS c FROM customers');
  const totalProducts = getRowCount('SELECT COUNT(*) AS c FROM products');
  const activeUsers = getRowCount('SELECT COUNT(*) AS c FROM users WHERE status = ?', ['active']);
  const openTickets = getRowCount('SELECT COUNT(*) AS c FROM tickets WHERE status IN (?, ?)', ['open', 'pending']);
  const newSubmissions = getRowCount('SELECT COUNT(*) AS c FROM submissions WHERE status = ?', ['new']);
  const lowStockCount = getRowCount('SELECT COUNT(*) AS c FROM products WHERE stock < ?', [10]);

  const last7Days = db.prepare(
    `SELECT strftime('%Y-%m-%d', created_at) AS label,
            COUNT(*) AS orders,
            COALESCE(SUM(total), 0) AS revenue
     FROM orders
     WHERE created_at >= datetime('now', '-6 days')
     GROUP BY strftime('%Y-%m-%d', created_at)
     ORDER BY label ASC`,
  ).all() as Array<{ label: string; orders: number; revenue: number }>;

  const orderStatus = (db.prepare(
    `SELECT status AS name, COUNT(*) AS value
     FROM orders
     GROUP BY status
     ORDER BY value DESC`,
  ).all() as Array<{ name: string; value: number }>).map((row, index) => ({
    name: row.name,
    value: Number(row.value),
    color: ['#38bdf8', '#10b981', '#f59e0b', '#8b5cf6', '#f87171', '#94a3b8'][index % 6],
  }));

  const recentOrders = (db.prepare(
    `SELECT o.id,
            o.order_number AS orderNumber,
            COALESCE(c.first_name || ' ' || c.last_name, o.guest_name, 'Guest customer') AS customer,
            o.total,
            o.status,
            o.created_at AS createdAt
     FROM orders o
     LEFT JOIN customers c ON c.id = o.customer_id
     ORDER BY o.created_at DESC
     LIMIT 5`,
  ).all() as Array<{ id: number; orderNumber: string; customer: string; total: number; status: string; createdAt: string }>);

  const lowStock = (db.prepare(
    `SELECT id, name, stock, sku, status
     FROM products
     WHERE stock < 10
     ORDER BY stock ASC
     LIMIT 5`,
  ).all() as Array<{ id: number; name: string; stock: number; sku: string | null; status: string }>).map((row) => ({
    id: row.id,
    name: row.name,
    stock: Number(row.stock),
    sku: row.sku ?? 'n/a',
    status: row.status,
  }));

  const recentActivity = (db.prepare(
    `SELECT id, action, COALESCE(user_name, 'system') AS actor, COALESCE(entity, 'system') AS entity, created_at AS createdAt
     FROM activity_log
     ORDER BY id DESC
     LIMIT 6`,
  ).all() as Array<{ id: number; action: string; actor: string; entity: string; createdAt: string }>);

  const topProducts = (db.prepare(
    `SELECT p.id, p.name, p.stock,
            COALESCE(SUM(oi.quantity), 0) AS sold,
            COALESCE(SUM(oi.total_price), 0) AS revenue
     FROM products p
     LEFT JOIN order_items oi ON oi.product_id = p.id
     GROUP BY p.id
     ORDER BY sold DESC, revenue DESC
     LIMIT 5`,
  ).all() as Array<{ id: number; name: string; stock: number; sold: number; revenue: number }>);

  const revenueTrend = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    const found = last7Days.find((entry) => entry.label === key);
    return {
      label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: Number(found?.revenue ?? 0),
      orders: Number(found?.orders ?? 0),
    };
  });

  const lastMonthRevenue = Number(
    (db.prepare('SELECT COALESCE(SUM(total),0) AS total FROM orders WHERE payment_status = ? AND created_at >= datetime("now", "-60 days") AND created_at < datetime("now", "-30 days")').get('paid') as { total?: number } | undefined)?.total ?? 0,
  );
  const revenueDelta = lastMonthRevenue === 0 ? '0%' : `${(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100).toFixed(1)}%`;

  const kpis: AdminKpi[] = [
    {
      label: 'Gross revenue',
      value: formatMoney(monthlyRevenue),
      delta: `${revenueDelta} vs last month`,
      detail: '30-day order revenue',
      tone: 'emerald',
    },
    {
      label: 'Orders',
      value: totalOrders.toLocaleString(),
      delta: `${((paidRevenue / Math.max(totalOrders, 1)) || 0).toFixed(0)} avg revenue / order`,
      detail: `${paidRevenue ? 'paid totals' : 'No paid orders yet'}`,
      tone: 'sky',
    },
    {
      label: 'Customers',
      value: totalCustomers.toLocaleString(),
      delta: `${activeUsers.toLocaleString()} active accounts`,
      detail: 'customer base',
      tone: 'violet',
    },
    {
      label: 'Inventory',
      value: totalProducts.toLocaleString(),
      delta: `${lowStockCount.toLocaleString()} low-stock SKUs`,
      detail: 'catalog health',
      tone: 'amber',
    },
    {
      label: 'Support queue',
      value: openTickets.toLocaleString(),
      delta: `${newSubmissions.toLocaleString()} new leads`,
      detail: 'open support items',
      tone: 'rose',
    },
  ];

  return {
    kpis,
    revenueSeries: revenueTrend,
    orderStatus,
    recentOrders: recentOrders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      customer: order.customer,
      total: Number(order.total),
      status: order.status,
      createdAt: order.createdAt,
    })),
    lowStock,
    recentActivity: recentActivity.map((entry) => ({
      id: entry.id,
      action: entry.action,
      actor: entry.actor,
      entity: entry.entity,
      createdAt: entry.createdAt,
    })),
    topProducts: topProducts.map((item) => ({
      id: item.id,
      name: item.name,
      sold: Number(item.sold),
      revenue: Number(item.revenue),
      stock: Number(item.stock),
    })),
  };
}
