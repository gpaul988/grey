/**
 * Structured Logging System
 * 
 * Provides JSON-based logging with:
 * - File rotation (5MB per file, max 5 files)
 * - Correlation IDs for request tracing
 * - Log levels: debug, info, warn, error
 * - Structured format (easy parsing)
 * - Performance metrics tracking
 * 
 * Usage:
 *   logger.info('User logged in', { userId: 123 })
 *   logger.error('Payment failed', { orderId: 456, error: e.message })
 */

import winston from 'winston';
import fs from 'fs';
import path from 'path';

// Ensure log directory exists
const logDir = (() => {
  const envDir = process.env.LOG_DIR;
  if (envDir) return envDir;
  
  // Production: try /var/log/grey
  if (process.env.NODE_ENV === 'production') {
    try {
      const prodDir = '/var/log/grey';
      if (!fs.existsSync(prodDir)) {
        fs.mkdirSync(prodDir, { recursive: true });
      }
      return prodDir;
    } catch (e) {
      console.warn('⚠️ Could not create /var/log/grey, using .logs instead');
    }
  }
  
  // Fallback: .logs in project root
  return '.logs';
})();

if (!fs.existsSync(logDir)) {
  try {
    fs.mkdirSync(logDir, { recursive: true });
  } catch (e) {
    console.warn('⚠️ Could not create log directory, logging may not work');
  }
}

// Custom JSON format with correlation ID
const jsonFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  winston.format.errors({ stack: true }),
  winston.format((info) => {
    // Add process info
    info.pid = process.pid;
    info.env = process.env.NODE_ENV || 'development';
    // Preserve correlation ID if present
    if (global.correlationId) {
      info.correlationId = global.correlationId;
    }
    return info;
  })(),
  winston.format.json()
);

// Create logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: jsonFormat,
  defaultMeta: { service: 'grey-infotech' },
  transports: [
    // Error logs (level >= error)
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
    }),

    // Combined logs (all levels)
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 10485760, // 10MB
      maxFiles: 10,
      tailable: true,
    }),

    // Info & warn
    new winston.transports.File({
      filename: path.join(logDir, 'application.log'),
      level: 'info',
      maxsize: 10485760,
      maxFiles: 10,
      tailable: true,
    }),
  ],
});

// Console logging in development
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          (info) =>
            `${info.timestamp} [${info.level}] ${info.message}${
              Object.keys(info).length > 4
                ? ' ' + JSON.stringify(info, null, 2)
                : ''
            }`
        )
      ),
    })
  );
}

// Global correlation ID storage (for async context)
declare global {
  var correlationId: string | undefined;
}

/**
 * Generate and set correlation ID for request tracing
 * Call at the start of each request
 */
export function generateCorrelationId(): string {
  const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  global.correlationId = id;
  return id;
}

/**
 * Clear correlation ID
 * Call at the end of each request
 */
export function clearCorrelationId(): void {
  delete global.correlationId;
}

/**
 * Log performance metrics
 */
export function logPerformance(
  operation: string,
  duration: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata?: Record<string, any>
) {
  if (duration > 1000) {
    // Log slow operations as warning
    logger.warn(`Slow operation: ${operation}`, {
      duration,
      ...metadata,
    });
  } else {
    logger.debug(`Operation completed: ${operation}`, {
      duration,
      ...metadata,
    });
  }
}

/**
 * Express/Next.js middleware to add correlation ID to all requests
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function correlationIdMiddleware(req: any, res: any, next: any) {
  const correlationId = req.headers['x-correlation-id'] || generateCorrelationId();
  global.correlationId = correlationId;
  res.setHeader('X-Correlation-ID', correlationId);

  // Log request
  logger.info('Incoming request', {
    method: req.method,
    url: req.url,
    ip: req.ip || req.headers['x-forwarded-for'],
    userAgent: req.headers['user-agent'],
  });

  // Log response when done
  const originalSend = res.send;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res.send = function (data: any) {
    logger.info('Request completed', {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: Date.now() - (req.startTime || Date.now()),
    });
    return originalSend.call(this, data);
  };

  next();
}

export default logger;
