import * as log4js from 'log4js';
import * as path from 'path';

const baseLogPath = path.resolve(__dirname, '../../logs');

const commonAppenderConfig = {
  type: 'dateFile',
  pattern: 'yyyy-MM-dd',
  alwaysIncludePattern: true,
  daysToKeep: 30,
  compress: true,
  keepFileExt: true, // 是否保留文件后缀
};

const log4jsConfig: log4js.Configuration = {
  /** 日志输出源配置，定义日志输出格式 */
  appenders: {
    console: {
      type: 'console', // 控制打印到控制台
    },
    access: {
      ...commonAppenderConfig,
      filename: `${baseLogPath}/access/access.log`,
      category: 'http',
    },
    app: {
      ...commonAppenderConfig,
      filename: `${baseLogPath}/app/app.log`,
      layout: {
        type: 'pattern',
        pattern: "[%d{yyyy-MM-dd hh:mm:ss SSS}] [%p] -h: %h -pid: %z  msg: '%m' ",
      },
    },
    errorFile: {
      ...commonAppenderConfig,
      filename: `${baseLogPath}/error/error.log`,
      layout: {
        type: 'pattern',
        pattern: "[%d{yyyy-MM-dd hh:mm:ss SSS}] [%p] -h: %h -pid: %z  msg: '%m' ",
      },
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },
  /** 日志统计维度 */
  categories: {
    default: {
      appenders: ['console', 'access', 'app', 'errors'],
      level: 'DEBUG',
    },
    mysql: {
      appenders: ['access', 'errors'],
      level: 'info',
    },
    http: {
      appenders: ['access'],
      level: 'DEBUG',
    },
  },
};

export default log4jsConfig;
