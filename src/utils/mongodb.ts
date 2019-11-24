import config from 'config';
import mongoose from 'mongoose';
import logger from './logger';

const mongodbConfig: any = config.get('mongodb');

function connect(): Promise<mongoose.Mongoose> {
  mongoose.connection.on('connected', () => {
    logger.info('Connected to MongoDB');
  });
  mongoose.connection.on('error', (error) => {
    logger.error(`Connection to MongoDB failed: ${error}`);
  });

  logger.info('Connecting on MongoDB');
  return mongoose.connect(mongodbConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default { connect };
