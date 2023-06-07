import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { Server } from 'http';
import { logger, errorLogger } from './shared/logger';
// import { logger, errorLogger } from './shared/logger'

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;

async function boostrap() {
  try {
    await mongoose.connect(config.database_url as string);
    logger.info('Database Connection Successfully');
    server = app.listen(config.port, () => {
      logger.info(`Application app listening on port ${config.port}`);
    });
  } catch (err) {
    errorLogger.error('Database connection failed', err);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

boostrap();

process.on('SIGTERM', () => {
  logger.info('Sigterm Received');
  if (server) {
    server.close();
  }
});
