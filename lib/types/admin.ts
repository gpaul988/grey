export interface DashboardMetrics {
  users: {
    total: number;
    activeMonth: number;
    newThisMonth: number;
  };
  revenue: {
    total: number;
    thisMonth: number;
    thisWeek: number;
    byGateway: Record<string, number>;
  };
  services: {
    total: number;
    topServices: Array<{ id: string; name: string; views: number; purchases: number }>;
  };
  audits: {
    total: number;
    completed: number;
    completionRate: number;
  };
  payments: {
    total: number;
    successful: number;
    failed: number;
    refunded: number;
  };
  webhooks: {
    totalEvents: number;
    successRate: number;
    failedDeliveries: number;
  };
  search: {
    totalQueries: number;
    topQueries: Array<{ query: string; count: number }>;
  };
}

export interface AdminStats {
  timestamp: Date;
  metrics: DashboardMetrics;
}
