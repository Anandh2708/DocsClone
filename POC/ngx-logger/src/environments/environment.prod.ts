import { NgxLoggerLevel } from "ngx-logger";

export const environment = {
  production: true,
  logging:{
      level: NgxLoggerLevel.TRACE,
      disableConsoleLogging: false,
      serverLogLevel: NgxLoggerLevel.ERROR,
      serverLoggingUrl: '/api/logs', //Provide your server logging URL here
  }
};
