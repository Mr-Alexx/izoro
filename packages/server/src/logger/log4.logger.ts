import * as log4js from 'log4js'
import * as fs from 'fs-extra'
import { join } from 'path'

const LOG_PATH = '../../logs'

fs.ensureDirSync(join(__dirname, LOG_PATH))
void ['request', 'response', 'error'].forEach((t) => {
  fs.ensureDirSync(join(__dirname, LOG_PATH, t))
})

const resolvePath = (dir, filename) => join(__dirname, LOG_PATH, dir, filename)

const commonCinfig = {
  type: 'dateFile',
  pattern: 'yyyy-MM-dd.log',
  alwaysIncludePattern: true,
  daysToKeep: 30,
}

log4js.configure({
  appenders: {
    request: {
      ...commonCinfig,
      filename: resolvePath('request', 'request'),
      category: 'request',
    },
    response: {
      ...commonCinfig,
      filename: resolvePath('response', 'response'),
      category: 'response',
    },
    error: {
      ...commonCinfig,
      filename: resolvePath('error', 'error'),
      category: 'error',
    },
  },
  categories: {
    default: { appenders: ['request'], level: 'info' },
    response: { appenders: ['response'], level: 'info' },
    error: { appenders: ['error'], level: 'info' },
  },
} as any)

export const requestLogger = log4js.getLogger('request')
export const responseLogger = log4js.getLogger('response')
export const errorLogger = log4js.getLogger('error')
