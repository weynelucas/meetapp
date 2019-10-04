import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { resolve } from 'path';
import * as Sentry from '@sentry/node';
import Youch from 'youch';
import { setLocale } from 'yup';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';
import locale from './config/locale';

const isProduction = process.env.NODE_ENV === 'production';

class App {
  constructor() {
    this.server = express();

    setLocale(locale);

    if (isProduction) {
      Sentry.init(sentryConfig);
    }

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(resolve(__dirname, '..', 'public', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (!isProduction) {
        const error = await new Youch(err, req).toHTML();
        return res.status(500).send(error);
      }

      return res.sendStatus(500);
    });
  }
}

export default new App().server;
