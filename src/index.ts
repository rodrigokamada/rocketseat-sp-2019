import config from 'config';
import http from 'http';
import logger from './utils/logger';
import app from './app';
import mongodb from './utils/mongodb';

const applicationConfig: any = config.get('application');

const port = process.env.PORT || applicationConfig.get('port');

mongodb.connect();

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
server.on('listening', () => logger.info(`Listening on port ${port}`));
