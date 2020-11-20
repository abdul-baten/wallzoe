import { Express } from "express";
import { IConfig } from "config";
import { createLogger, transports } from "winston";
import expressWinston from "express-winston";

export default (app: Express, config: IConfig) => {
  const logger = createLogger({
    transports: [
      new transports.File({
        filename: __dirname + config.get("logFilePath")
      })
    ],
    exceptionHandlers: [
      new transports.File({
        filename: __dirname + config.get("exceptionsLogFilePath")
      })
    ]
  });

  process.on("unhandledRejection", err => {
    logger.error("Unhandled Rejection > ", err);
  });

  app.use(
    expressWinston.errorLogger({
      transports: [
        new transports.File({
          filename: __dirname + config.get("expressLogFilePath")
        })
      ]
    })
  );
};
