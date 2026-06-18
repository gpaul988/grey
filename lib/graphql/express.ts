import { Request, Response } from 'express';
import { createApolloServer, graphqlContextFactory } from './server';
import { parseBody } from '@apollo/server';

let apolloServer: any;

/**
 * Express middleware for GraphQL endpoint
 */
export async function graphqlMiddleware(req: Request, res: Response) {
  try {
    // Initialize Apollo Server on first request
    if (!apolloServer) {
      apolloServer = await createApolloServer();
    }

    // Create context with request
    const context = await graphqlContextFactory(req);

    // Handle GraphQL query
    if (req.method === 'GET') {
      // GET requests show GraphQL playground
      return res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Apollo GraphQL Playground</title>
            <style>
              body { margin: 0; padding: 0; }
            </style>
          </head>
          <body>
            <div id="apollo"></div>
            <script src="https://embeddable-sandbox.cdn.apollographql.com/_latest/embeddable-sandbox.umd.production.min.js"></script>
            <script>
              new window.EmbeddedSandbox({
                target: "#apollo",
                initialState: {
                  document: "{ __typename }",
                  variables: {},
                  headers: {},
                  url: "/api/graphql",
                },
              });
            </script>
          </body>
        </html>
      `);
    }

    if (req.method === 'POST') {
      // Parse JSON body
      let body: any;

      if (typeof req.body === 'string') {
        body = JSON.parse(req.body);
      } else {
        body = req.body;
      }

      const { query, variables, operationName } = body;

      // Execute GraphQL query
      const result = await apolloServer.executeOperation(
        {
          query,
          variables,
          operationName,
        },
        { req, ...context }
      );

      res.set('Content-Type', 'application/json');
      return res.send(result);
    }

    res.status(405).send('Method not allowed');
  } catch (error) {
    console.error('GraphQL middleware error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
