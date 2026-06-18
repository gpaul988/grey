import { getDb } from '../db';
import { Request } from 'express';

export interface GraphQLContext {
  db: ReturnType<typeof getDb>;
  req: Request;
  user?: {
    id: number;
    email: string;
    role: string;
  };
}

export async function createGraphQLContext(req: Request): Promise<GraphQLContext> {
  // Extract user from session/JWT
  const user = (req as any).user;

  return {
    db: getDb(),
    req,
    user,
  };
}
