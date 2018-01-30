import winston from 'winston';

const myFormat = winston.format.printf(info => {
  return `${new Date().toLocaleString()} ${info.level.toUpperCase()}: ${info.message}`;
});


const logger = winston.createLogger({
  level: 'info',
  format: myFormat,
  transports: [
    new winston.transports.Console()
  ]
});

logger.info("Logger launched");

export default logger;
