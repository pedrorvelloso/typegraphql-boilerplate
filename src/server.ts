import express from 'express';
import http from 'http';
import path from 'path';

import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';
import { Container, Service } from 'typedi';

import jwt from 'express-jwt';

import Env from './config/Env';
import { AuthContext } from './auth/auth-context';
import { customAuthChecker } from './auth/auth-checker';

@Service()
class App {
  private server: http.Server;
  private app: express.Application;
  private configService: Env;

  constructor() {
    this.app = express();
    this.configService = Container.get(Env);

    this.middlewares();
    this.apolloServer();

    this.server = new http.Server(this.app);
  }

  private middlewares() {
    this.app.use(
      '/graphql',
      jwt({
        secret: this.configService.get('JWT_SECRET'),
        credentialsRequired: false,
      }),
    );
    // @ts-ignore
    this.app.use((err, req, res, next) => {
      req.user = null;
      return next();
    });
  }

  private async apolloServer(): Promise<ApolloServer> {
    const schema = await buildSchema({
      resolvers: [
        path.resolve(__dirname, 'graphql', '**', '*-resolver.{js,ts}'),
      ],
      authChecker: customAuthChecker,
      container: Container,
    });

    const apollo = new ApolloServer({
      schema,
      context: ({ req }: any) => {
        const ctx: AuthContext = {
          ...req.user,
        };
        return ctx;
      },
      playground: true,
    });

    apollo.applyMiddleware({ app: this.app });

    return apollo;
  }

  private async dbConnection() {
    await createConnection({
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      synchronize: true,
      entities: [path.resolve(__dirname, 'entity', '**', '*.{js,ts}')],
      migrations: [path.resolve(__dirname, 'migration', '**', '*.{js,ts}')],
      cli: {
        entitiesDir: path.resolve(__dirname, 'entity'),
        migrationsDir: path.resolve(__dirname, 'migration'),
      },
    });
  }

  public async bootstrap() {
    try {
      await this.dbConnection();
      this.server.listen(this.configService.get('PORT'), () => {
        console.log(`Server running on port ${this.configService.get('PORT')}`);
      });
    } catch (error) {
      console.log('Failed to start server');
      console.error(error);
    }
  }
}

export default new App();
