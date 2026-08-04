/**
 * Live Demo Environment Manager
 * Manages demo instance lifecycle (create, run, cleanup)
 */

export interface DemoInstance {
  id: string;
  serviceType: string; // 'react', 'nodejs', 'python', etc.
  status: 'running' | 'stopped' | 'error';
  createdAt: Date;
  expiresAt: Date;
  url?: string;
  port?: number;
  logs: string[];
  error?: string;
  resourceUsage?: {
    cpu: number;
    memory: number;
  };
}

export interface DemoOptions {
  serviceType: string;
  timeout?: number; // in minutes, default 60
  maxInstances?: number;
}

// In-memory demo storage (in production, use database)
const demoInstances: Map<string, DemoInstance> = new Map();
let instanceCounter = 0;

/**
 * Generate unique demo ID
 */
const generateDemoId = (): string => {
  instanceCounter++;
  return `demo-${Date.now()}-${instanceCounter}`;
};

/**
 * Start a new demo instance
 */
export const startDemo = async (options: DemoOptions): Promise<DemoInstance> => {
  try {
    const id = generateDemoId();
    const timeout = options.timeout || 60; // 60 minutes default
    const expiresAt = new Date(Date.now() + timeout * 60 * 1000);

    // Check max instances limit
    const runningCount = Array.from(demoInstances.values()).filter(d => d.status === 'running').length;
    if (options.maxInstances && runningCount >= options.maxInstances) {
      throw new Error(`Maximum concurrent demos (${options.maxInstances}) reached`);
    }

    const instance: DemoInstance = {
      id,
      serviceType: options.serviceType,
      status: 'running',
      createdAt: new Date(),
      expiresAt,
      port: 3000 + Math.floor(Math.random() * 10000),
      logs: [`Demo instance created at ${new Date().toISOString()}`],
    };

    // Simulate demo startup
    instance.logs.push(`Starting ${options.serviceType} service on port ${instance.port}...`);
    instance.url = `http://localhost:${instance.port}`;
    instance.logs.push(`Service available at ${instance.url}`);

    // Store demo
    demoInstances.set(id, instance);

    // Schedule cleanup
    scheduleCleanup(id, timeout * 60 * 1000); // timeout in milliseconds

    return instance;
  } catch (error) {
    console.error('Failed to start demo:', error);
    throw error;
  }
};

/**
 * Stop a demo instance
 */
export const stopDemo = async (demoId: string): Promise<boolean> => {
  try {
    const instance = demoInstances.get(demoId);
    if (!instance) {
      return false;
    }

    instance.status = 'stopped';
    instance.logs.push(`Demo stopped at ${new Date().toISOString()}`);
    demoInstances.set(demoId, instance);

    return true;
  } catch (error) {
    console.error('Failed to stop demo:', error);
    return false;
  }
};

/**
 * Get demo instance status
 */
export const getDemoStatus = (demoId: string): DemoInstance | null => {
  return demoInstances.get(demoId) || null;
};

/**
 * List all active demos
 */
export const listActiveDemos = (): DemoInstance[] => {
  const now = new Date();
  return Array.from(demoInstances.values())
    .filter(d => d.status === 'running' && d.expiresAt > now)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

/**
 * Get demo logs
 */
export const getDemoLogs = (demoId: string): string[] => {
  const instance = demoInstances.get(demoId);
  return instance?.logs || [];
};

/**
 * Add log entry to demo
 */
export const addDemoLog = (demoId: string, message: string): void => {
  const instance = demoInstances.get(demoId);
  if (instance) {
    instance.logs.push(`[${new Date().toISOString()}] ${message}`);
    // Keep only last 100 logs
    if (instance.logs.length > 100) {
      instance.logs = instance.logs.slice(-100);
    }
  }
};

/**
 * Schedule automatic cleanup for expired demos
 */
const cleanupTimeouts: Map<string, NodeJS.Timeout> = new Map();

const scheduleCleanup = (demoId: string, ttl: number): void => {
  // Clear existing timeout if any
  const existing = cleanupTimeouts.get(demoId);
  if (existing) {
    clearTimeout(existing);
  }

  // Schedule new cleanup
  const timeout = setTimeout(async () => {
    await cleanupDemo(demoId);
    cleanupTimeouts.delete(demoId);
  }, ttl);

  cleanupTimeouts.set(demoId, timeout);
};

/**
 * Clean up demo instance (internal)
 */
const cleanupDemo = async (demoId: string): Promise<void> => {
  try {
    const instance = demoInstances.get(demoId);
    if (instance) {
      instance.status = 'stopped';
      instance.logs.push(`Demo expired and cleaned up at ${new Date().toISOString()}`);
      demoInstances.set(demoId, instance);
    }
  } catch (error) {
    console.error(`Failed to cleanup demo ${demoId}:`, error);
  }
};

/**
 * Force cleanup all expired demos
 */
export const cleanupExpiredDemos = (): number => {
  const now = new Date();
  let cleaned = 0;

  for (const [id, instance] of demoInstances.entries()) {
    if (instance.expiresAt < now && instance.status === 'running') {
      instance.status = 'stopped';
      instance.logs.push(`Demo forcefully cleaned up at ${now.toISOString()}`);
      demoInstances.set(id, instance);
      cleaned++;
    }
  }

  return cleaned;
};

/**
 * Get demo statistics
 */
export const getDemoStats = () => {
  const all = Array.from(demoInstances.values());
  const now = new Date();
  const active = all.filter(d => d.status === 'running' && d.expiresAt > now);

  return {
    totalCreated: all.length,
    activeCount: active.length,
    stoppedCount: all.filter(d => d.status === 'stopped').length,
    errorCount: all.filter(d => d.status === 'error').length,
    avgLifetime: active.length > 0 
      ? Math.round(
          active.reduce((sum, d) => sum + (now.getTime() - d.createdAt.getTime()), 0) / active.length / 1000
        )
      : 0,
    serviceTypes: [...new Set(all.map(d => d.serviceType))],
  };
};

/**
 * Reset all demos (for testing)
 */
export const resetDemos = (): void => {
  demoInstances.clear();
  for (const timeout of cleanupTimeouts.values()) {
    clearTimeout(timeout);
  }
  cleanupTimeouts.clear();
  instanceCounter = 0;
};
