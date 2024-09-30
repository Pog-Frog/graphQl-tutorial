import typeDefs from "./schema/typeDefs";
import resolvers from "./schema/resolvers";
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';

async function startApolloServer(typeDefs: any, resolvers: any) {
  const app = express();
  const httpServer = http.createServer(app);

  app.use(cors<cors.CorsRequest>({ origin: "*", credentials: true }));

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  }) as any

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: "*", credentials: true }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log('Server ready at http://localhost:4000/graphql');
}

startApolloServer(typeDefs, resolvers).catch(console.error);