import type { NextApiRequest, NextApiResponse } from 'next';
import { aggregateMetrics } from '../../../lib/admin/metrics';
import { verifyAdminToken } from '../../../lib/admin/auth';

/**
 * WebSocket endpoint for real-time dashboard metrics
 * Usage: wss://domain/api/ws/dashboard?token=<admin_token>
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const server = (res.socket as any)?.server;
  if (!server?.ws) {
    console.log('Initializing WebSocket server');

    const WebSocketServer = require('ws').Server;
    const wss = new WebSocketServer({ noServer: true });

    // Upgrade HTTP to WebSocket
    server?.on('upgrade', async (request: any, socket: any, head: any) => {
      if (request.url?.startsWith('/api/ws/dashboard')) {
        // Extract token from query string
        const url = new URL(request.url, `http://${request.headers.host}`);
        const token = url.searchParams.get('token');

        if (!token) {
          socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
          socket.destroy();
          return;
        }

        // Verify token
        const user = verifyAdminToken(token);
        if (!user) {
          socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
          socket.destroy();
          return;
        }

        // Upgrade connection
        wss.handleUpgrade(request, socket, head, (ws: any) => {
          handleConnection(ws, user.id);
        });
      }
    });

    if (server) {
      server.ws = wss;
    }
  }

  res.status(200).json({ message: 'WebSocket server running' });
}

/**
 * Handle new WebSocket connection
 */
async function handleConnection(ws: any, userId: string) {
  console.log(`Admin connected: ${userId}`);

  // Send initial metrics
  try {
    const metrics = await aggregateMetrics();
    ws.send(
      JSON.stringify({
        type: 'metrics',
        payload: metrics,
        timestamp: new Date(),
      })
    );
  } catch (err) {
    console.error('Failed to fetch metrics:', err);
    ws.send(
      JSON.stringify({
        type: 'error',
        message: 'Failed to fetch metrics',
      })
    );
  }

  // Set up periodic updates (every 1 minute)
  const interval = setInterval(async () => {
    if (ws.readyState !== 1) {
      // WebSocket.OPEN
      clearInterval(interval);
      return;
    }

    try {
      const metrics = await aggregateMetrics();
      ws.send(
        JSON.stringify({
          type: 'metrics',
          payload: metrics,
          timestamp: new Date(),
        })
      );
    } catch (err) {
      console.error('Failed to fetch metrics:', err);
    }
  }, 60 * 1000); // 1 minute

  // Handle incoming messages
  ws.on('message', async (data: string) => {
    try {
      const message = JSON.parse(data);

      if (message.type === 'ping') {
        ws.send(JSON.stringify({ type: 'pong' }));
      }

      if (message.type === 'refresh') {
        const metrics = await aggregateMetrics();
        ws.send(
          JSON.stringify({
            type: 'metrics',
            payload: metrics,
            timestamp: new Date(),
          })
        );
      }
    } catch (err) {
      console.error('Failed to handle message:', err);
    }
  });

  // Clean up on disconnect
  ws.on('close', () => {
    console.log(`Admin disconnected: ${userId}`);
    clearInterval(interval);
  });

  ws.on('error', (err: Error) => {
    console.error('WebSocket error:', err);
    clearInterval(interval);
  });
}
