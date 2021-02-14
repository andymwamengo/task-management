/**
 * Logger
 */
import * as winston from "winston";

export class LoggerMiddleware {

  loggerMiddleware = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    transports: [
        new winston.transports.File({ filename: "combined.log" }),
        new winston.transports.File({
            filename: "error.log",
            level: "error",
        }),
        new winston.transports.File({
            filename: "debug.log",
            level: "debug",
        }),
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: "exceptions.log" }),
    ],
    exitOnError: false,
});
}
