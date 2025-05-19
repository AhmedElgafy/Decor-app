import { createLogger, format, transports, addColors } from "winston";

addColors({
  error: "red",
  warn: "yellow",
  info: "cyan",
  debug: "green",
});

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.colorize({ all: true }),
    format.timestamp(),
    format.printf(({ timestamp, level, message, ...meta }) => {
      return `${timestamp} [${level}]: ${message} ${
        Object.keys(meta).length ? JSON.stringify(meta) : ""
      }`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "combined.log",
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

export default logger;
