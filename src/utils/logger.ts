import winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  // format: winston.format.json(),
  format: winston.format.prettyPrint(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
